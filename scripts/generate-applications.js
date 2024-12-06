const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
const { v4: uuidv4 } = require('uuid')

let now = new Date().toISOString()

const generateRule6Party = (params) => {
  let party = {}
  party.id = uuidv4()
  party.status = params.status || faker.helpers.arrayElement([
    'Awaiting review',
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
  return party
}

const generateApplication = () => {
  let application = {}

  // Application ID
  application.id = "" + faker.number.int({ min: 123456, max: 999999 })

  application.rule6Parties = []

  application.rule6Parties.push(generateRule6Party({
    status: 'Awaiting review',
    emailAddress: 'tony@starkindustries.com',
    firstName: 'Tony',
    lastName: 'Stark',
    hasOrganisation: 'Yes',
    organisationName: 'Stark Industries',
    phone: '07714545545'
  }))

  application.rule6Parties.push(generateRule6Party({
    status: 'Awaiting review',
    emailAddress: 'natasha@shield.com',
    firstName: 'Natasha',
    lastName: 'Romanoff',
    hasOrganisation: 'Yes',
    organisationName: 'S.H.I.E.L.D',
    phone: '07714545546'
  }))

  application.rule6Parties.push(generateRule6Party({
    status: 'Awaiting review',
    emailAddress: 'peter@example.com',
    firstName: 'Peter',
    lastName: 'Parker',
    hasOrganisation: 'No',
    phone: '07714545546'
  }))

  application.rule6Parties.push(generateRule6Party({
    status: 'Approved',
    emailAddress: 'bruce@avengers.com',
    firstName: 'Bruce',
    lastName: 'Banner',
    hasOrganisation: 'Yes',
    organisationName: 'Avengers',
    phone: '07714545546'
  }))

  application.rule6Parties.push(generateRule6Party({
    status: 'Rejected',
    emailAddress: 'scott@pymtech.com',
    firstName: 'Scott',
    lastName: 'Lang',
    hasOrganisation: 'Yes',
    organisationName: 'Pym Technologies',
    phone: '07714545546'
  }))

  application.rule6Parties.push(generateRule6Party({
    status: 'Withdrawn',
    emailAddress: 'carol@starfoce.com',
    firstName: 'Carol',
    lastName: 'Danvers',
    hasOrganisation: 'Yes',
    organisationName: 'Starforce',
    phone: '07714545546'
  }))

  for(let i = 0; i < 100; i++) {
    // application.rule6Parties.push(generateRule6Party())
  }

  return application
}

const generateApplications = () => {
  const applications = []

  for(let i = 0; i < 10; i++) {
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