const appeals = require('./appeals.json')
const linkedAppeals = require('./linked-appeals.json')

module.exports = {
  appeals,
  linkedAppeals,
  sort: 'Status',
  filters: {
    caseOfficers: ['Tony Stark']
  },
  userType: 'caseOfficer'
}
