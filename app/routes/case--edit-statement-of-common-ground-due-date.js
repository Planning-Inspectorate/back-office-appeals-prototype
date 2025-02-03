const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:appealId/edit-statement-of-common-ground-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/edit-statement-of-common-ground-due-date/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-statement-of-common-ground-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.statementOfCommonGroundDueDate = moment({
      year: req.session.data.editStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.year,
      month: req.session.data.editStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.month - 1,
      day: req.session.data.editStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.day}
    ).toISOString()
    req.flash('success', 'Statement of common ground due date updated')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}