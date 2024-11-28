const { v4: uuidv4 } = require('uuid')

module.exports = {
  rule6applications: [
    {
      id: uuidv4(),
      status: 'Awaiting review',
      emailAddress: 'sam@example.com',
      firstName: 'Sam',
      lastName: 'Fisher',
      hasOrganisation: 'Yes',
      organisationName: 'Saint Rita’s Community Association',
      phone: '07714545545'
    },
    {
      id: uuidv4(),
      status: 'Awaiting review',
      emailAddress: 'ian@example.com',
      firstName: 'Ian',
      lastName: 'Smith',
      hasOrganisation: 'Yes',
      organisationName: 'Natural Southwark',
      phone: '07714545546'
    },
    {
      id: uuidv4(),
      status: 'Awaiting review',
      emailAddress: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Diamond',
      hasOrganisation: 'No',
      phone: '07714545547'
    },
    {
      id: uuidv4(),
      status: 'Invited',
      emailAddress: 'ian@example.com',
      firstName: 'Ian',
      lastName: 'Smith',
      hasOrganisation: 'Yes',
      organisationName: 'Natural Southwark',
      phone: '07714545546'
    },
    {
      id: uuidv4(),
      status: 'Accepted',
      emailAddress: 'adam@example.com',
      firstName: 'Adam',
      lastName: 'Smith',
      hasOrganisation: 'Yes',
      organisationName: 'Natural Arc',
      phone: '07714545546'
    },
    {
      id: uuidv4(),
      status: 'Rejected',
      emailAddress: 'ryan@example.com',
      firstName: 'Ryan',
      lastName: 'Smith',
      hasOrganisation: 'Yes',
      organisationName: 'Recky',
      phone: '07714545546'
    },
    {
      id: uuidv4(),
      status: 'Withdrawn',
      emailAddress: 'william@example.com',
      firstName: 'William',
      lastName: 'Smith',
      hasOrganisation: 'Yes',
      organisationName: 'Winchester',
      phone: '07714545546'
    }
  ]
}
