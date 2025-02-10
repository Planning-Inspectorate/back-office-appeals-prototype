const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
const { v4: uuidv4 } = require('uuid')

let now = new Date().toISOString()

const baseStatuses = [
  'Ready to assign case officer',
  'Ready to validate',
  'Ready to start',
  'Awaiting LPAQ',
  'LPAQ ready to review',
  'Decision ready to issue',
  'Decision issued'
]

const s78Statuses = [
  'Awaiting statements and IP comments',
  'Statements and IP comments ready to review',
  'Statements and IP comments ready to share'
]

const s78WrittenStatuses = [
  'Awaiting final comments',
  'Final comments ready to review',
  'Final comments ready to share',
  'Site visit ready to set up',
  'Awaiting site visit'
]

const s78HearingStatuses = [
  'Hearing ready to set up',
  'Awaiting hearing'
]

const s78InquiryStatuses = [
  'Inquiry ready to set up',
  'Awaiting proof of evidence and witnesses',
  'Proof of evidence and witnesses ready to review',
  'Proof of evidence and witnesses ready to share',
  'Awaiting inquiry'
]

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const generateAddress = () => {
  return {
    line1: faker.number.int({ min: 1, max: 100 }) + ' ' + capitalizeFirstLetter(faker.food.fruit()) + ' ' + faker.helpers.arrayElement(['Road', 'Avenue', 'Lane', 'Walk']),
    town: faker.helpers.arrayElement(['London', 'Manchester', 'Birmingham', 'Bristol']),
    postcode: faker.location.zipCode('WD# #JT')
  }
}

const generateAgent = (params = {}) => {
  let agent = {}
  agent.id = uuidv4()
  agent.firstName = params.firstName || faker.person.firstName()
  agent.lastName = params.lastName || faker.person.lastName()
  agent.phone = params.phone || '079## ### ###'.replace(/#+/g, (m) => faker.string.numeric(m.length));
  agent.organisationName = params.organisationName || faker.company.name()
  agent.emailAddress = `${agent.firstName.toLowerCase()}.${agent.lastName.toLowerCase()}@example.com`
  return agent
}

const generateRule6Party = (params) => {
  let party = {}
  party.id = uuidv4()
  party.status = params.status || faker.helpers.arrayElement([
    'Ready to review',
    'Approved',
    'Rejected',
    'Withdrawn'
  ])
  party.dateReceived = params.dateReceived || faker.date.recent({ days: 2 })

  if(party.status == 'Rejected') {
    party.dateRejected = faker.date.between({
      from: party.dateReceived,
      to: now
    })
  }
  if(party.status == 'Approved') {
    party.dateApproved = faker.date.between({
      from: party.dateReceived,
      to: now
    })
  }
  if(party.status == 'Withdrawn') {
    party.dateWithdrawn = faker.date.between({
      from: party.dateReceived,
      to: now
    })
  }


  party.firstName = params.firstName || faker.person.firstName()
  party.lastName = params.lastName || faker.person.lastName()
  party.emailAddress = `${party.firstName.toLowerCase()}.${party.lastName.toLowerCase()}@gmail.com`
  party.phone = params.phone || '079## ### ###'.replace(/#+/g, (m) => faker.string.numeric(m.length));
  party.hasOrganisation = params.hasOrganisation || faker.helpers.arrayElement([
    'Yes',
    'Yes',
    'Yes',
    'Yes',
    'Yes',
    'Yes',
    'Yes',
    'Yes',
    'No'
  ])
  if(party.hasOrganisation == 'Yes') {
    party.organisationName = params.organisationName || faker.company.name()
  }

  switch(params._case.status) {
    case "Statements and IP comments ready to review":
    case "Statements and IP comments ready to share":
    case "Inquiry ready to set up":
    case "Proof of evidence and witnesses ready to review":
    case "Proof of evidence and witnesses ready to share":
    case "Awaiting inquiry":
    case "Decision ready to issue":
    case "Decision issued":
      party.statement = {}
      party.statement.dateReceived = faker.date.recent({ days: 2 })
      party.statement.status = 'Ready to review'
      party.statement.statement = 'Having reviewed the proposal we would like to raise strong objections based on the scale of the proposed buildings so close to a residential area. Residents have not been consulted on this and our views of the greenbelt adjacent to the estate will be ruined if this goes ahead. David Newton at number 6 The Grove also agrees.'
      party.statement.documents = [{
        name: 'St.Ritas_Community_Association_statement_for_appeal_4012345.doc',
        size: '5MB'
      }]
      break
  }

  return party
}

const generateCase = (params = {}) => {
  let _case = {}

  _case.id = params.id || "" + faker.number.int({ min: 123456, max: 999999 })
  _case.type = params.type || faker.helpers.arrayElement(['Householder appeal', 'Full planning appeal'])

  _case.linkedAppeal = params.linkedAppeal || faker.helpers.arrayElement(['No appeals', '1234567', ])

  let statuses = baseStatuses

  if(_case.type == 'Full planning appeal') {
    statuses = statuses.concat(s78Statuses)

    _case.procedure = params.procedure || faker.helpers.arrayElement([
      'Written representations',
      'Hearing',
      'Inquiry'
    ])

    if(_case.procedure == 'Written representations') {
      statuses = statuses.concat(s78WrittenStatuses)
    }
    if(_case.procedure == 'Hearing') {
      statuses = statuses.concat(s78HearingStatuses)
    }
    if(_case.procedure == 'Inquiry') {
      statuses = statuses.concat(s78InquiryStatuses)
    }
  }

  _case.status = params.status || faker.helpers.arrayElement(statuses)

  if(_case.status !== 'Ready to assign case officer') {
    _case.caseOfficer = faker.helpers.arrayElement([
      'Tony Stark',
      'Natasha Romanoff',
      'Peter Parker'
    ])
  }

  if(_case.status == 'Ready to assign case officer' || _case.status == 'Ready to validate' || _case.status == 'Ready to start') {
    _case.procedure = null
  }

  _case.appellant = params.appellant || {}
  _case.appellant.firstName = params.appellant?.firstName || faker.person.firstName()
  _case.appellant.lastName = params.appellant?.lastName || faker.person.lastName()
  _case.appellant.emailAddress = params.appellant?.emailAddress || `${_case.appellant.firstName.toLowerCase()}.${_case.appellant.lastName.toLowerCase()}@gmail.com`
  _case.appellant.phone = params.appellant?.phone || '079## ### ###'.replace(/#+/g, (m) => faker.string.numeric(m.length));
  _case.appellant.address = params.appellant?.address || generateAddress()

  _case.agent = generateAgent()

  _case.lpa = params.lpa || {}
  _case.lpa.name = params.lpa?.name || faker.helpers.arrayElement([
    'Barnet',
    'Hertfordshire'
  ])

  _case.lpa.emailAddress = params.lpa?.emailAddress || 'example@'+_case.lpa.name+'.com'

  _case.site = params.site || {}
  _case.site.address = params.site?.address || generateAddress()

  // Generate Rule 6 Parties based on this
  if(_case.procedure == 'Inquiry') {
    _case.rule6Parties = []


    _case.rule6Parties.push(generateRule6Party({
      _case,
      status: 'Ready to review',
      emailAddress: 'tony@starkindustries.com',
      firstName: 'Tony',
      lastName: 'Stark',
      hasOrganisation: 'Yes',
      organisationName: 'Stark Industries',
      phone: '07714545545'
    }))


    _case.rule6Parties.push(generateRule6Party({
      _case,
      status: 'Ready to review',
      emailAddress: 'natasha@shield.com',
      firstName: 'Natasha',
      lastName: 'Romanoff',
      hasOrganisation: 'Yes',
      organisationName: 'S.H.I.E.L.D',
      phone: '07714545546'
    }))


    _case.rule6Parties.push(generateRule6Party({
      _case,
      status: 'Ready to review',
      emailAddress: 'peter@example.com',
      firstName: 'Peter',
      lastName: 'Parker',
      hasOrganisation: 'No',
      phone: '07714545546'
    }))


    _case.rule6Parties.push(generateRule6Party({
      _case,
      status: 'Approved',
      emailAddress: 'bruce@avengers.com',
      firstName: 'Bruce',
      lastName: 'Banner',
      hasOrganisation: 'Yes',
      organisationName: 'Avengers',
      phone: '07714545546'
    }))


    _case.rule6Parties.push(generateRule6Party({
      _case,
      status: 'Rejected',
      emailAddress: 'scott@pymtech.com',
      firstName: 'Scott',
      lastName: 'Lang',
      hasOrganisation: 'Yes',
      organisationName: 'Pym Technologies',
      phone: '07714545546'
    }))

    _case.rule6Parties.push(generateRule6Party({
      _case,
      status: 'Withdrawn',
      emailAddress: 'carol@starfoce.com',
      firstName: 'Carol',
      lastName: 'Danvers',
      hasOrganisation: 'Yes',
      organisationName: 'Starforce',
      phone: '07714545546'
    }))
  }

  return _case
}

const generateCases = () => {
  const cases = []

  // This will be when everything is completely filled in (Written)
  cases.push(generateCase({
    id: '00000009',
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Ready to start",
    linkedAppeal: '1234567'
  }))

  // This will be when everything is not filled in (Written)
  cases.push(generateCase({
    id: '00000010',
    type: 'Full planning appeal',
    procedure: 'Written representations',
    linkedAppeal: 'No appeals',
    status: "Ready to start"
  }))

  cases.push(generateCase({
    type: 'Full planning appeal',
    status: "Ready to assign case officer"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    status: "Ready to validate"
  }))
  cases.push(generateCase({
    id: '00000005',
    type: 'Full planning appeal',
    status: "Ready to start"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    status: "Awaiting LPAQ"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    status: "LPAQ ready to review"
  }))

  cases.push(generateCase({
    type: 'Full planning appeal',
    status: "Awaiting statements and IP comments"
  }))
  cases.push(generateCase({
    id: '00182182',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Statements and IP comments ready to review"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    status: "Statements and IP comments ready to share"
  }))

  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Awaiting final comments"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Final comments ready to review"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Final comments ready to share"
  }))
  cases.push(generateCase({
    id: '00000001',
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Site visit ready to set up"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Awaiting site visit"
  }))

  cases.push(generateCase({
    id: '00000002',
    type: 'Full planning appeal',
    procedure: 'Hearing',
    status: "Hearing ready to set up"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Hearing',
    status: "Awaiting hearing"
  }))

  cases.push(generateCase({
    id: '00000003',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Inquiry ready to set up"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Awaiting proof of evidence and witnesses"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Proof of evidence and witnesses ready to review"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Proof of evidence and witnesses ready to share"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Awaiting inquiry"
  }))

  cases.push(generateCase({
    id: '00000004',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Decision ready to issue"
  }))
  cases.push(generateCase({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Decision issued"
  }))

  for(let i = 0; i < 50; i++) {
    cases.push(generateCase())
  }

  return cases
}

const generateCasesFile = (filePath) => {
  const cases = generateCases()
  const filedata = JSON.stringify(cases, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Cases generated: ${filePath}`)
    }
  )
}

generateCasesFile(path.join(__dirname, '../app/data/cases.json'))