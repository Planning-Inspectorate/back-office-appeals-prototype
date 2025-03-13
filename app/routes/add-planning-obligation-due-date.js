const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:caseId/add-planning-obligation-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-planning-obligation-due-date/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-planning-obligation-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.planningObligationDueDate = moment({
      year: req.session.data.addPlanningObligationDueDate.planningObligationDueDate.year,
      month: req.session.data.addPlanningObligationDueDate.planningObligationDueDate.month - 1,
      day: req.session.data.addPlanningObligationDueDate.planningObligationDueDate.day}
    ).toISOString()
    req.flash('success', 'Planning obligation due date added')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}