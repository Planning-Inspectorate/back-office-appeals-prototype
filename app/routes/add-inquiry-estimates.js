module.exports = router => {

  router.get('/main/appeals/:appealId/add-inquiry-estimates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-inquiry-estimates/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-inquiry-estimates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-inquiry-estimates/check`)
  })

  router.get('/main/appeals/:appealId/add-inquiry-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-inquiry-estimates/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-inquiry-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.inquiryEstimates = req.session.data.addInquiryEstimates
    delete req.session.data.addInquiryEstimates
    req.flash('success', 'Inquiry estimates added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}