const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:appealId/add-planning-obligation-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-planning-obligation-due-date/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-planning-obligation-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.planningObligationDueDate = moment({
      year: req.session.data.addPlanningObligationDueDate.planningObligationDueDate.year,
      month: req.session.data.addPlanningObligationDueDate.planningObligationDueDate.month - 1,
      day: req.session.data.addPlanningObligationDueDate.planningObligationDueDate.day}
    ).toISOString()
    req.flash('success', 'Planning obligation due date added')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}