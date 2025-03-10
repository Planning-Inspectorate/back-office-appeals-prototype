
const { generateTimetable } = require('../helpers/timetable')
const { getActions } = require('../helpers/actions')
const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let timetable = generateTimetable(_case)
    let actions = getActions(_case)
    const isCaseStarted = _case.status !== 'Ready to assign case officer' && _case.status !== 'Ready to validate' && _case.status !== 'Ready to start'

    let hasLinkedAppeals = _case.linkedAppeals?.length
    let isChildAppeal
    let isLeadAppeal
    if(hasLinkedAppeals) {
      isChildAppeal = _.some(_case?.linkedAppeals, { relationship: 'Lead' })
      isLeadAppeal = _.every(_case?.linkedAppeals, { relationship: 'Child' })
    }

    res.render('/main/cases/show', {
      _case,
      timetable,
      actions,
      isCaseStarted,
      isChildAppeal,
      isLeadAppeal
    })
  })

}