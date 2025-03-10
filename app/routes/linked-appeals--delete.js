const { DateTime } = require("luxon")
const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/linked-appeals/:linkedAppealId/delete', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    let linkedAppealId = _case.linkedAppeals.find(appeal => appeal.id === req.params.linkedAppealId)
    res.render('/main/cases/linked-appeals/delete/index', {
      _case,
      linkedAppealId
    })
  })

  router.post('/main/cases/:caseId/linked-appeals/:linkedAppealId/delete', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    // Remove linked appeal
    _.remove(_case.linkedAppeals, appeal => appeal.id === req.params.linkedAppealId)

    // do the same the other way around
    // let _case2 = req.session.data.cases.find(_case => _case.id == req.params.linkedAppealId)
    _.remove(_case2.linkedAppeals, appeal => appeal.id === _case.id)

    req.flash('success', 'Appeal unlinked')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}