module.exports = router => {

  router.get('/main/cases/:caseId/add-procedure', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-procedure/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-procedure', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-procedure/check`)
  })

  router.get('/main/cases/:caseId/add-procedure/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-procedure/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-procedure/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    _case.procedure = req.session.data.addAppealProcedure.procedure
    req.flash('success', 'Appeal procedure added')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}