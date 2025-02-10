const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:appealId/add-statement-of-common-ground-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-statement-of-common-ground-due-date/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-statement-of-common-ground-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.statementOfCommonGroundDueDate = moment({
      year: req.session.data.addStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.year,
      month: req.session.data.addStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.month - 1,
      day: req.session.data.addStatementOfCommonGroundDueDate.statementOfCommonGroundDueDate.day}
    ).toISOString()
    req.flash('success', 'Statement of common ground due date added')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}