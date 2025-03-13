const moment = require('moment')

module.exports = router => {

  router.get('/main/appeals/:caseId/edit-statement-of-common-ground-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/edit-statement-of-common-ground-due-date/index', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/edit-statement-of-common-ground-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    appeal.statementOfCommonGroundDueDate = moment({
      year: req.session.data.editStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.year,
      month: req.session.data.editStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.month - 1,
      day: req.session.data.editStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.day}
    ).toISOString()
    req.flash('success', 'Statement of common ground due date updated')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}