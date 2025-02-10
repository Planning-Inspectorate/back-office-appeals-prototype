const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:appealId/edit-planning-obligation-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/edit-planning-obligation-due-date/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-planning-obligation-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.planningObligationDueDate = moment({
      year: req.session.data.editPlanningObligationDueDate.planningObligationDueDate.year,
      month: req.session.data.editPlanningObligationDueDate.planningObligationDueDate.month - 1,
      day: req.session.data.editPlanningObligationDueDate.planningObligationDueDate.day}
    ).toISOString()
    req.flash('success', 'Planning obligation due date updated')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}