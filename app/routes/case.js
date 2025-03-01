
const { generateTimetable } = require('../helpers/timetable')
const { getActions } = require('../helpers/actions')

module.exports = router => {

  router.get('/main/cases/:caseId', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let timetable = generateTimetable(_case)
    let actions = getActions(_case)
    const isCaseStarted = _case.status !== 'Ready to assign case officer' && _case.status !== 'Ready to validate' && _case.status !== 'Ready to start'

    res.render('/main/cases/show', {
      _case,
      timetable,
      actions,
      isCaseStarted
    })
  })

}