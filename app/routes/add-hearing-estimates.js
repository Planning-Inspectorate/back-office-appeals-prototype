module.exports = router => {

  router.get('/main/cases/:caseId/add-hearing-estimates', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-hearing-estimates/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-hearing-estimates', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-hearing-estimates/check`)
  })

  router.get('/main/cases/:caseId/add-hearing-estimates/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-hearing-estimates/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-hearing-estimates/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    _case.hearingEstimates = req.session.data.addHearingEstimates
    delete req.session.data.addHearingEstimates
    req.flash('success', 'Hearing estimates added')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}