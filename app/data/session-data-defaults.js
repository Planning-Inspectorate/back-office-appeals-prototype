const appeals = require('./appeals.json')
const linkedAppeals = require('./linked-appeals.json')

module.exports = {
  appeals,
  linkedAppeals,
  sort: 'Due date',
  filters: {
    caseOfficers: ['Tony Stark']
  },
  userType: 'caseOfficer'
}
