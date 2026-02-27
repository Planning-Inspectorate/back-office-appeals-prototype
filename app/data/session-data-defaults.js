const appeals = require('./appeals.json')
const linkedAppeals = require('./linked-appeals.json')
const localPlanningAuthorities = require('./local-planning-authorities')

module.exports = {
  appeals,
  linkedAppeals,
  'local-planning-authorities': localPlanningAuthorities,
  sort: 'Due date',
  userType: 'caseOfficer'
}
