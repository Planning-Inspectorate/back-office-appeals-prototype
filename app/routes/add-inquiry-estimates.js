module.exports = router => {

  router.get('/main/cases/:caseId/add-inquiry-estimates', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-inquiry-estimates/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-inquiry-estimates', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-inquiry-estimates/check`)
  })

  router.get('/main/cases/:caseId/add-inquiry-estimates/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-inquiry-estimates/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-inquiry-estimates/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.inquiryEstimates = req.session.data.addInquiryEstimates
    delete req.session.data.addInquiryEstimates
    req.flash('success', 'Inquiry estimates added')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}