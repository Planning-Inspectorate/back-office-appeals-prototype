const moment = require('moment')

module.exports = router => {

  router.get('/main/appeals/:appealId/add-planning-obligation-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-planning-obligation-due-date/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-planning-obligation-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.planningObligationDueDate = moment({
      year: req.session.data.addPlanningObligationDueDate.planningObligationDueDate.year,
      month: req.session.data.addPlanningObligationDueDate.planningObligationDueDate.month - 1,
      day: req.session.data.addPlanningObligationDueDate.planningObligationDueDate.day}
    ).toISOString()
    req.flash('success', 'Planning obligation due date added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}