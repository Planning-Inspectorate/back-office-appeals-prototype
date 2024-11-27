const { v4: uuidv4 } = require('uuid')

module.exports = {
  rule6applications: [
    {
      id: uuidv4(),
      emailAddress: 'sam@example.com',
      firstName: 'Sam',
      lastName: 'Fisher',
      hasOrganisation: 'Yes',
      organisationName: 'Saint Rita’s Community Association',
      phone: '07714545545'
    },
    {
      id: uuidv4(),
      emailAddress: 'ian@example.com',
      firstName: 'Ian',
      lastName: 'Smith',
      hasOrganisation: 'Yes',
      organisationName: 'Natural Southwark',
      phone: '07714545546'
    },
    {
      id: uuidv4(),
      emailAddress: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Diamond',
      hasOrganisation: 'No',
      phone: '07714545547'
    }
  ]
}
