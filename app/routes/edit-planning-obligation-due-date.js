const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:caseId/edit-planning-obligation-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-planning-obligation-due-date/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-planning-obligation-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.planningObligationDueDate = moment({
      year: req.session.data.editPlanningObligationDueDate.planningObligationDueDate.year,
      month: req.session.data.editPlanningObligationDueDate.planningObligationDueDate.month - 1,
      day: req.session.data.editPlanningObligationDueDate.planningObligationDueDate.day}
    ).toISOString()
    req.flash('success', 'Planning obligation due date updated')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}