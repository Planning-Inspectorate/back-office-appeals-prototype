module.exports = router => {

  router.get('/main/appeals/:caseId/add-inquiry-estimates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/add-inquiry-estimates/index', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/add-inquiry-estimates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.caseId}/add-inquiry-estimates/check`)
  })

  router.get('/main/appeals/:caseId/add-inquiry-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/add-inquiry-estimates/check', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/add-inquiry-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    appeal.inquiryEstimates = req.session.data.addInquiryEstimates
    delete req.session.data.addInquiryEstimates
    req.flash('success', 'Inquiry estimates added')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}