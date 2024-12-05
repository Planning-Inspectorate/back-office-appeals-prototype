const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
const { v4: uuidv4 } = require('uuid')

const generateApplication = () => {
  let application = {}

  // Application ID
  application.id = "" + faker.number.int({ min: 123456, max: 999999 })

  let now = new Date().toISOString()

  application.rule6Parties = [{
    id: uuidv4(),
    dateAdded: faker.date.recent({ days: 2 }),
    status: 'Awaiting review',
    emailAddress: 'tony@starkindustries.com',
    firstName: 'Tony',
    lastName: 'Stark',
    hasOrganisation: 'Yes',
    organisationName: 'Stark Industries',
    phone: '07714545545'
  },
  {
    id: uuidv4(),
    dateAdded: faker.date.recent({ days: 2 }),
    status: 'Awaiting review',
    emailAddress: 'natasha@shield.com',
    firstName: 'Natasha',
    lastName: 'Romanoff',
    hasOrganisation: 'Yes',
    organisationName: 'S.H.I.E.L.D',
    phone: '07714545546'
  },
  {
    id: uuidv4(),
    dateAdded: faker.date.recent({ days: 2 }),
    status: 'Invited',
    emailAddress: 'peter@example.com',
    firstName: 'Peter',
    lastName: 'Parker',
    hasOrganisation: 'No',
    phone: '07714545546'
  },
  {
    id: uuidv4(),
    dateAdded: faker.date.recent({ days: 2 }),
    status: 'Accepted',
    emailAddress: 'bruce@avengers.com',
    firstName: 'Bruce',
    lastName: 'Banner',
    hasOrganisation: 'Yes',
    organisationName: 'Avengers',
    phone: '07714545546'
  },
  {
    id: uuidv4(),
    dateAdded: faker.date.recent({ days: 2 }),
    status: 'Rejected',
    emailAddress: 'scott@pymtech.com',
    firstName: 'Scott',
    lastName: 'Lang',
    hasOrganisation: 'Yes',
    organisationName: 'Pym Technologies',
    phone: '07714545546'
  },
  {
    id: uuidv4(),
    dateAdded: faker.date.recent({ days: 2 }),
    status: 'Withdrawn',
    emailAddress: 'carol@starfoce.com',
    firstName: 'Carol',
    lastName: 'Danvers',
    hasOrganisation: 'Yes',
    organisationName: 'Starforce',
    phone: '07714545546'
  }]

  for(let i = 0; i < 100; i++) {
    let party = {}
    party.status = faker.helpers.arrayElement([
      'Awaiting review',
      'Accepted',
      'Invited',
      'Rejected',
      'Withdrawn'
    ])
    party.dateAdded = faker.date.recent({ days: 2 })
    party.firstName = faker.person.firstName()
    party.lastName = faker.person.lastName()
    party.emailAddress = `${party.firstName.toLowerCase()}.${party.lastName.toLowerCase()}@gmail.com`
    party.phoneNumber = '079## ### ###'.replace(/#+/g, (m) => faker.string.numeric(m.length));
    party.hasOrganisation = faker.helpers.arrayElement([
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
      party.organisationName = faker.company.name()
    }

    application.rule6Parties.push(party)
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