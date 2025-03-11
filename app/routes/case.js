
const { generateTimetable } = require('../helpers/timetable')
const { getActions } = require('../helpers/actions')
const { getLinkedAppeals, isLeadAppeal, isChildAppeal } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/cases/:caseId', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let timetable = generateTimetable(_case)
    let actions = getActions(_case)
    const isCaseStarted = _case.status !== 'Ready to assign case officer' && _case.status !== 'Ready to validate' && _case.status !== 'Ready to start'

    const linkedAppeals = getLinkedAppeals(_case.id, req.session.data.linkedAppeals)

    res.render('/main/cases/show', {
      _case,
      timetable,
      actions,
      isCaseStarted,
      isLeadAppeal: isLeadAppeal(_case.id, req.session.data.linkedAppeals),
      isChildAppeal: isChildAppeal(_case.id, req.session.data.linkedAppeals),
      linkedAppeals
    })
  })

}