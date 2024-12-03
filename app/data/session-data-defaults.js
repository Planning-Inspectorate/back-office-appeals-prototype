const { v4: uuidv4 } = require('uuid')
const faker =  require('@faker-js/faker').faker

module.exports = {
  rule6applications: [
    {
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
    }
  ]
}
