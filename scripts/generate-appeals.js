const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
const { v4: uuidv4 } = require('uuid')
const { DateTime } = require("luxon")

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

const generateInterestedPartyComment = (params = {}) => {
  let ipComment = {}
  ipComment.id = uuidv4()
  ipComment.status = params.status || faker.helpers.arrayElement([
    'Ready to review',
    'Accepted',
    'Rejected',
    'Withdrawn'
  ])
  ipComment.dateReceived = params.dateReceived || faker.date.recent({ days: 2 })

  if(ipComment.status == 'Rejected') {
    ipComment.dateRejected = faker.date.between({
      from: ipComment.dateReceived,
      to: now
    })
  }
  if(ipComment.status == 'Approved') {
    ipComment.dateApproved = faker.date.between({
      from: ipComment.dateReceived,
      to: now
    })
  }
  if(ipComment.status == 'Withdrawn') {
    ipComment.dateWithdrawn = faker.date.between({
      from: ipComment.dateReceived,
      to: now
    })
  }


  ipComment.firstName = params.firstName || faker.person.firstName()
  ipComment.lastName = params.lastName || faker.person.lastName()
  ipComment.emailAddress = `${ipComment.firstName.toLowerCase()}.${ipComment.lastName.toLowerCase()}@gmail.com`
  ipComment.comment = '	Having reviewed the proposal I would like to raise strong objections based on the scale of the proposed buildings.'
  ipComment.documents = [{
    name: 'St.Ritas_Community_Association_statement_for_appeal_4012345.doc',
    size: '5MB'
  }]

  return ipComment
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

  switch(params.appeal.status) {
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
      party.statement.statement = 'Having reviewed the proposal we would like to raise strong objections based on the scale of the proposed buildings so close to a residential area. <mark>Residents have not been consulted</mark> on this and our views of the greenbelt adjacent to the estate will be ruined if this goes ahead. David Newton at number 6 The Grove also agrees.'
      party.statement.documents = [{
        name: 'St.Ritas_Community_Association_statement_for_appeal_4012345.doc',
        size: '5MB'
      }]

      party.proofOfEvidenceAndWitnesses = {}
      party.proofOfEvidenceAndWitnesses.status = 'Ready to review'
      party.proofOfEvidenceAndWitnesses.evidenceAndSummary = [{
        name: 'summary.pdf',
        size: '5MB'
      }]
      party.proofOfEvidenceAndWitnesses.witnessesAndSummary = [{
        name: 'witnesses.pdf',
        size: '5MB'
      }]

      break
  }

  return party
}

const generateAppeal = (params = {}) => {
  let appeal = {}

  appeal.id = params.id || "" + faker.number.int({ min: 123456, max: 999999 })
  appeal.type = params.type || faker.helpers.arrayElement(['Householder appeal', 'Full planning appeal'])

  appeal.linkedAppeals = params.linkedAppeals || []

  let statuses = baseStatuses

  if(appeal.type == 'Full planning appeal') {
    statuses = statuses.concat(s78Statuses)

    appeal.procedure = params.procedure || faker.helpers.arrayElement([
      'Written representations',
      'Hearing',
      'Inquiry'
    ])

    if(appeal.procedure == 'Written representations') {
      statuses = statuses.concat(s78WrittenStatuses)
    }
    if(appeal.procedure == 'Hearing') {
      statuses = statuses.concat(s78HearingStatuses)
    }
    if(appeal.procedure == 'Inquiry') {
      statuses = statuses.concat(s78InquiryStatuses)
    }
  }

  appeal.status = params.status || faker.helpers.arrayElement(statuses)

  if(appeal.status !== 'Ready to assign case officer') {
    appeal.caseOfficer = params.caseOfficer || faker.helpers.arrayElement([
      'Tony Stark',
      'Tony Stark',
      'Tony Stark',
      'Tony Stark',
      'Tony Stark',
      'Tony Stark',
      'Natasha Romanoff',
      'Peter Parker'
    ])
  }

  if(appeal.status == 'Ready to assign case officer' || appeal.status == 'Ready to validate' || appeal.status == 'Ready to start') {
    appeal.procedure = null
  }

  let appealForm = {}

  appealForm.procedurePreference = faker.helpers.arrayElement(['Written representations', 'Hearing', 'Inquiry'])
  appealForm.hasPlanningObligation = faker.helpers.arrayElement(['Yes', 'No'])
  if(appealForm.hasPlanningObligation == 'Yes') {
    if(appealForm.procedurePreference == 'Written representations') {
      appealForm.planningObligation = {
        name: 'planning-obligation.pdf',
        size: '5MB'
      }
    } else {
      appealForm.readyToSubmitPlanningObligation = faker.helpers.arrayElement(['Yes', 'No'])
      if(appealForm.readyToSubmitPlanningObligation == 'Yes') {
        appealForm.planningObligation = {
          name: 'planning-obligation.pdf',
          size: '5MB'
        }
      }
    }
  }
  appeal.appealForm = appealForm

  switch(appeal.status) {
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to share':
    case 'Awaiting final comments':
    case 'Final comments ready to review':
    case 'Final comments ready to share':
    case 'Site visit ready to set up':
    case 'Awaiting site visit':
    case 'Hearing ready to set up':
    case 'Awaiting hearing':
    case 'Inquiry ready to set up':
    case 'Awaiting inquiry':
    case 'Awaiting proof of evidence and witnesses':
    case 'Proof of evidence and witnesses ready to review':
    case 'Proof of evidence and witnesses ready to share':
    case 'Decision ready to issue':
    case 'Decision issued':
      appeal.lpaStatement = {
        statement: 'Sit laborum adipisicing nisi do velit dolor eiusmod aute ipsum commodo eu Lorem. Culpa qui irure irure aliquip. Sint consectetur ea nisi pariatur ipsum dolore in quis in eiusmod pariatur ex.\n\n Esse labore amet aliqua incididunt quis consequat cillum dolor sunt aute voluptate consectetur amet anim. Tempor officia est ea consectetur minim non do cupidatat dolor.',
        documents: [{
          name: 'document.pdf',
          size: '5MB'
        }]
      }
      break
  }




  if(appeal.procedure == 'Written representations') {
    appeal.startDate = DateTime.now().toISO()
    appeal.LPAQuestionnaireDueDate = DateTime.now().toISO()
    appeal.statementsDueDate = DateTime.now().toISO()
    appeal.interestedPartyCommentsDueDate = DateTime.now().toISO()
    appeal.finalCommentsDueDate = DateTime.now().toISO()
    if(appealForm.hasPlanningObligation == 'Yes' && !appealForm.planningObligation) {
      appeal.planningObligationDueDate = DateTime.now().toISO()
    }

    if(appeal.status != 'Site visit to set up') {
      appeal.siteVisit = faker.helpers.arrayElement([{
        date: DateTime.now().toISO(),
        time: '10am',
        hasAddress: 'No'
      }, null])
    }

  }

  if(appeal.procedure == 'Hearing') {
    appeal.startDate = DateTime.now().toISO()
    appeal.LPAQuestionnaireDueDate = DateTime.now().toISO()
    appeal.statementsDueDate = DateTime.now().toISO()
    appeal.interestedPartyCommentsDueDate = DateTime.now().toISO()
    appeal.statementOfCommonGroundDueDate = DateTime.now().toISO()
    if(appealForm.hasPlanningObligation == 'Yes' && !appealForm.planningObligation) {
      appeal.planningObligationDueDate = DateTime.now().toISO()
    }

    if(appeal.status != 'Hearing ready to set up') {
      appeal.hearing = {
        date: DateTime.now().set({ hour: 10, minute: 0 }).toISO(),
        hasAddress: 'No'
      }
    }

  }

  if(appeal.procedure == 'Inquiry') {
    appeal.startDate = DateTime.now().toISO()
    appeal.LPAQuestionnaireDueDate = DateTime.now().toISO()
    appeal.statementsDueDate = DateTime.now().toISO()
    appeal.interestedPartyCommentsDueDate = DateTime.now().toISO()
    appeal.statementOfCommonGroundDueDate = DateTime.now().toISO()
    appeal.proofOfEvidenceAndWitnessesDueDate = DateTime.now().toISO()
    if(appealForm.hasPlanningObligation == 'Yes' && !appealForm.planningObligation) {
      appeal.planningObligationDueDate = DateTime.now().toISO()
    }

    appeal.inquiry = {
      date: DateTime.now().set({ hour: 10, minute: 0 }).toISO(),
      hasDays: 'Yes',
      days: 10,
      hasAddress: 'Yes',
      address: {
        line1: '100 Ocean Avenue',
        town: 'London',
        postcode: 'W3 1EE'
      }
    }
  }

  appeal.appellant = params.appellant || {}
  appeal.appellant.firstName = params.appellant?.firstName || faker.person.firstName()
  appeal.appellant.lastName = params.appellant?.lastName || faker.person.lastName()
  appeal.appellant.emailAddress = params.appellant?.emailAddress || `${appeal.appellant.firstName.toLowerCase()}.${appeal.appellant.lastName.toLowerCase()}@gmail.com`
  appeal.appellant.phone = params.appellant?.phone || '079## ### ###'.replace(/#+/g, (m) => faker.string.numeric(m.length));
  appeal.appellant.address = params.appellant?.address || generateAddress()

  appeal.agent = generateAgent()

  appeal.lpa = params.lpa || {}
  appeal.lpa.name = params.lpa?.name || faker.helpers.arrayElement([
    'Barnet Council',
    'Hertfordshire Council'
  ])

  appeal.lpa.emailAddress = params.lpa?.emailAddress || 'example@blah.com'

  appeal.site = params.site || {}
  appeal.site.address = params.site?.address || generateAddress()

  // IP comments
  appeal.interestedPartyComments = []

  if(params.interestedPartyComments) {
    appeal.interestedPartyComments = params.interestedPartyComments
  } else {
    for(let i = 0; i < 5; i++) {
      appeal.interestedPartyComments.push(generateInterestedPartyComment())
    }  
  }

  
  // Generate Rule 6 Parties based on this
  if(appeal.procedure == 'Inquiry') {
    appeal.rule6Parties = []


    appeal.rule6Parties.push(generateRule6Party({
      appeal,
      status: 'Ready to review',
      emailAddress: 'tony@starkindustries.com',
      firstName: 'Tony',
      lastName: 'Stark',
      hasOrganisation: 'Yes',
      organisationName: 'Stark Industries',
      phone: '07714545545'
    }))


    appeal.rule6Parties.push(generateRule6Party({
      appeal,
      status: 'Ready to review',
      emailAddress: 'natasha@shield.com',
      firstName: 'Natasha',
      lastName: 'Romanoff',
      hasOrganisation: 'Yes',
      organisationName: 'S.H.I.E.L.D',
      phone: '07714545546'
    }))


    appeal.rule6Parties.push(generateRule6Party({
      appeal,
      status: 'Ready to review',
      emailAddress: 'peter@example.com',
      firstName: 'Peter',
      lastName: 'Parker',
      hasOrganisation: 'No',
      phone: '07714545546'
    }))


    appeal.rule6Parties.push(generateRule6Party({
      appeal,
      status: 'Approved',
      emailAddress: 'bruce@avengers.com',
      firstName: 'Bruce',
      lastName: 'Banner',
      hasOrganisation: 'Yes',
      organisationName: 'Avengers',
      phone: '07714545546'
    }))


    appeal.rule6Parties.push(generateRule6Party({
      appeal,
      status: 'Rejected',
      emailAddress: 'scott@pymtech.com',
      firstName: 'Scott',
      lastName: 'Lang',
      hasOrganisation: 'Yes',
      organisationName: 'Pym Technologies',
      phone: '07714545546'
    }))

    appeal.rule6Parties.push(generateRule6Party({
      appeal,
      status: 'Withdrawn',
      emailAddress: 'carol@starfoce.com',
      firstName: 'Carol',
      lastName: 'Danvers',
      hasOrganisation: 'Yes',
      organisationName: 'Starforce',
      phone: '07714545546'
    }))
  }

  return appeal
}

const generateAppeals = () => {
  const appeals = []

  appeals.push(generateAppeal({
    id: '00000009',
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: 'Ready to start',
    caseOfficer: 'Tony Stark'
  }))

  appeals.push(generateAppeal({
    id: '00000010',
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: 'Ready to start',
    caseOfficer: 'Tony Stark'
  }))

  appeals.push(generateAppeal({
    id: '00000182',
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: 'Ready to start',
    caseOfficer: 'Tony Stark'
  }))

  appeals.push(generateAppeal({
    id: '00000011',
    type: 'Full planning appeal',
    procedure: 'Hearing',
    status: 'Awaiting hearing',
    caseOfficer: 'Tony Stark'
  }))

  let interestedPartyComments = [] 
  for(let i = 0; i < 32; i++) {
    interestedPartyComments.push(generateInterestedPartyComment())
  }

  appeals.push(generateAppeal({
    id: '00000012',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: 'Awaiting inquiry',
    interestedPartyComments: interestedPartyComments,
    caseOfficer: 'Tony Stark'
  }))

  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    status: 'Ready to assign case officer'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    status: 'Ready to validate',
    caseOfficer: 'Tony Stark'
  }))
  appeals.push(generateAppeal({
    id: '00000005',
    type: 'Full planning appeal',
    status: 'Ready to start',
    caseOfficer: 'Tony Stark'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    status: 'Awaiting LPAQ',
    caseOfficer: 'Tony Stark'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    status: 'LPAQ ready to review',
    caseOfficer: 'Tony Stark'
  }))

  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    status: 'Awaiting statements and IP comments'
  }))
  appeals.push(generateAppeal({
    id: '00182182',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: 'Statements and IP comments ready to review'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    status: 'Statements and IP comments ready to share'
  }))

  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: 'Awaiting final comments'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: 'Final comments ready to review'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: 'Final comments ready to share'
  }))
  appeals.push(generateAppeal({
    id: '00000001',
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: 'Site visit ready to set up'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Written representations',
    status: 'Awaiting site visit'
  }))

  appeals.push(generateAppeal({
    id: '00000002',
    type: 'Full planning appeal',
    procedure: 'Hearing',
    status: 'Hearing ready to set up'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Hearing',
    status: 'Awaiting hearing'
  }))

  appeals.push(generateAppeal({
    id: '00000003',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: 'Inquiry ready to set up'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: 'Awaiting proof of evidence and witnesses'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: 'Proof of evidence and witnesses ready to review'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: 'Proof of evidence and witnesses ready to share'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: 'Awaiting inquiry'
  }))

  appeals.push(generateAppeal({
    id: '00000004',
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: 'Decision ready to issue'
  }))
  appeals.push(generateAppeal({
    type: 'Full planning appeal',
    procedure: 'Inquiry',
    status: 'Decision issued'
  }))

  for(let i = 0; i < 45; i++) {
    appeals.push(generateAppeal())
  }

  return appeals
}

const generateAppealsFile = (filePath) => {
  const appeals = generateAppeals()
  const filedata = JSON.stringify(appeals, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Appeals generated: ${filePath}`)
    }
  )
}

generateAppealsFile(path.join(__dirname, '../app/data/appeals.json'))