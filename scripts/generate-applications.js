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

  switch(params.application.status) {
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

const generateApplication = (params = {}) => {
  let application = {}

  application.id = params.id || "" + faker.number.int({ min: 123456, max: 999999 })
  application.type = params.type || faker.helpers.arrayElement(['Householder appeal', 'Full planning appeal'])

  let statuses = baseStatuses

  if(application.type == 'Full planning appeal') {
    statuses = statuses.concat(s78Statuses)

    application.procedure = params.procedure || faker.helpers.arrayElement([
      'Written representations',
      'Hearing',
      'Inquiry'
    ])

    if(application.procedure == 'Written representations') {
      statuses = statuses.concat(s78WrittenStatuses)
    }
    if(application.procedure == 'Hearing') {
      statuses = statuses.concat(s78HearingStatuses)
    }
    if(application.procedure == 'Inquiry') {
      statuses = statuses.concat(s78InquiryStatuses)
    }
  }

  application.status = params.status || faker.helpers.arrayElement(statuses)

  if(application.status !== 'Ready to assign case officer') {
    application.caseOfficer = faker.helpers.arrayElement([
      'Tony Stark',
      'Natasha Romanoff',
      'Peter Parker'
    ])
  }

  // set up timetable dates based on status and procedure
  // Timetable dates
  // if(application.type == 'Householder appeal') {
    // application.validDate = faker.date.recent({ days: 1 })
    // application.startDate = faker.date.recent({ days: 1 })
    // application.LPAQDueDate = faker.date.recent({ days: 1 })
    // application.siteVisitDate = faker.date.recent({ days: 1 })
  // } else if(application.procedure) {
    // application.validDate = faker.date.recent({ days: 1 })
    // application.startDate = faker.date.recent({ days: 1 })
    // application.LPAQDueDate = faker.date.recent({ days: 1 })
    // application.LPAStatementDueDate = faker.date.recent({ days: 1 })
    // application.IPcommentsDueDate = faker.date.recent({ days: 1 })
    // application.planningObligationDueDate = faker.date.recent({ days: 1 })
    // application.statementOfCommonGroundDueDate = faker.date.recent({ days: 1 })
    // application.siteVisitDate = faker.date.recent({ days: 1 })
  // }

  if(application.status == 'Ready to assign case officer' || application.status == 'Ready to validate' || application.status == 'Ready to start') {
    application.procedure = null
  }

  application.appellant = params.appellant || {}
  application.appellant.firstName = params.appellant?.firstName || faker.person.firstName()
  application.appellant.lastName = params.appellant?.lastName || faker.person.lastName()
  application.appellant.emailAddress = params.appellant?.emailAddress || `${application.appellant.firstName.toLowerCase()}.${application.appellant.lastName.toLowerCase()}@gmail.com`
  application.appellant.phone = params.appellant?.phone || '079## ### ###'.replace(/#+/g, (m) => faker.string.numeric(m.length));
  application.appellant.address = params.appellant?.address || generateAddress()

  application.agent = generateAgent()

  application.lpa = params.lpa || {}
  application.lpa.name = params.lpa?.name || faker.helpers.arrayElement([
    'Barnet Council',
    'Hertfordshire Council'
  ])

  application.site = params.site || {}
  application.site.address = params.site?.address || generateAddress()

  // Generate Rule 6 Parties based on this
  if(application.procedure == 'Inquiry') {
    application.rule6Parties = []

    application.rule6Parties.push(generateRule6Party({
      application,
      status: 'Ready to review',
      emailAddress: 'tony@starkindustries.com',
      firstName: 'Tony',
      lastName: 'Stark',
      hasOrganisation: 'Yes',
      organisationName: 'Stark Industries',
      phone: '07714545545'
    }))

    application.rule6Parties.push(generateRule6Party({
      application,
      status: 'Ready to review',
      emailAddress: 'natasha@shield.com',
      firstName: 'Natasha',
      lastName: 'Romanoff',
      hasOrganisation: 'Yes',
      organisationName: 'S.H.I.E.L.D',
      phone: '07714545546'
    }))

    application.rule6Parties.push(generateRule6Party({
      application,
      status: 'Ready to review',
      emailAddress: 'peter@example.com',
      firstName: 'Peter',
      lastName: 'Parker',
      hasOrganisation: 'No',
      phone: '07714545546'
    }))

    application.rule6Parties.push(generateRule6Party({
      application,
      status: 'Approved',
      emailAddress: 'bruce@avengers.com',
      firstName: 'Bruce',
      lastName: 'Banner',
      hasOrganisation: 'Yes',
      organisationName: 'Avengers',
      phone: '07714545546'
    }))

    application.rule6Parties.push(generateRule6Party({
      application,
      status: 'Rejected',
      emailAddress: 'scott@pymtech.com',
      firstName: 'Scott',
      lastName: 'Lang',
      hasOrganisation: 'Yes',
      organisationName: 'Pym Technologies',
      phone: '07714545546'
    }))

    application.rule6Parties.push(generateRule6Party({
      application,
      status: 'Withdrawn',
      emailAddress: 'carol@starfoce.com',
      firstName: 'Carol',
      lastName: 'Danvers',
      hasOrganisation: 'Yes',
      organisationName: 'Starforce',
      phone: '07714545546'
    }))
  }

  return application
}

const generateApplications = () => {
  const applications = []

  applications.push(generateApplication({
    type: 'Full planning appeal',
    status: "Ready to assign case officer"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    status: "Ready to validate"
  }))
  applications.push(generateApplication({
    id: '00000005',
    type: 'Full planning appeal',
    status: "Ready to start"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    status: "Awaiting LPAQ"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    status: "LPAQ ready to review"
  }))

  applications.push(generateApplication({
    type: 'Full planning appeal',
    status: "Awaiting statements and IP comments"
  }))
  applications.push(generateApplication({
    id: '00182182',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Statements and IP comments ready to review"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    status: "Statements and IP comments ready to share"
  }))

  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Awaiting final comments"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Final comments ready to review"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Final comments ready to share"
  }))
  applications.push(generateApplication({
    id: '00000001',
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Site visit ready to set up"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: "Awaiting site visit"
  }))

  applications.push(generateApplication({
    id: '00000002',
    type: 'Full planning appeal',
    procedure: 'Hearing',
    status: "Hearing ready to set up"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Hearing',
    status: "Awaiting hearing"
  }))

  applications.push(generateApplication({
    id: '00000003',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Inquiry ready to set up"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Awaiting proof of evidence and witnesses"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Proof of evidence and witnesses ready to review"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Proof of evidence and witnesses ready to share"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Awaiting inquiry"
  }))

  applications.push(generateApplication({
    id: '00000004',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Decision ready to issue"
  }))
  applications.push(generateApplication({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: "Decision issued"
  }))

  for(let i = 0; i < 50; i++) {
    applications.push(generateApplication())
  }

  return applications
}

const generateApplicationsFile = (filePath) => {
  const applications = generateApplications()
  const filedata = JSON.stringify(applications, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Applications generated: ${filePath}`)
    }
  )
}

generateApplicationsFile(path.join(__dirname, '../app/data/applications.json'))