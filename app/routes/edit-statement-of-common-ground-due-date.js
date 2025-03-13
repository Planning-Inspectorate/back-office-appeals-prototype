const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:caseId/edit-statement-of-common-ground-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-statement-of-common-ground-due-date/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-statement-of-common-ground-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.statementOfCommonGroundDueDate = moment({
      year: req.session.data.editStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.year,
      month: req.session.data.editStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.month - 1,
      day: req.session.data.editStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.day}
    ).toISOString()
    req.flash('success', 'Statement of common ground due date updated')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}