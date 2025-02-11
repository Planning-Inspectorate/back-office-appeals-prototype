const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:caseId/add-statement-of-common-ground-due-date', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-statement-of-common-ground-due-date/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-statement-of-common-ground-due-date', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    _case.statementOfCommonGroundDueDate = moment({
      year: req.session.data.addStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.year,
      month: req.session.data.addStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.month - 1,
      day: req.session.data.addStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.day}
    ).toISOString()
    req.flash('success', 'Statement of common ground due date added')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}