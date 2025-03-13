const moment = require('moment')

module.exports = router => {

  router.get('/main/appeals/:caseId/edit-planning-obligation-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/edit-planning-obligation-due-date/index', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/edit-planning-obligation-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    appeal.planningObligationDueDate = moment({
      year: req.session.data.editPlanningObligationDueDate.planningObligationDueDate.year,
      month: req.session.data.editPlanningObligationDueDate.planningObligationDueDate.month - 1,
      day: req.session.data.editPlanningObligationDueDate.planningObligationDueDate.day}
    ).toISOString()
    req.flash('success', 'Planning obligation due date updated')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}