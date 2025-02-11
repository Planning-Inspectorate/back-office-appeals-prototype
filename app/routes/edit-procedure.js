module.exports = router => {

  router.get('/main/cases/:caseId/edit-procedure', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/check`)
  })

  router.get('/main/cases/:caseId/edit-procedure/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    _case.procedure = req.session.data.editAppealProcedure.procedure
    req.flash('success', 'Appeal procedure updated')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}