module.exports = router => {

  router.get('/main/cases/:appealId/add-inquiry-estimates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-inquiry-estimates/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-inquiry-estimates', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-inquiry-estimates/check`)
  })

  router.get('/main/cases/:appealId/add-inquiry-estimates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-inquiry-estimates/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-inquiry-estimates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.inquiryEstimates = req.session.data.addInquiryEstimates
    delete req.session.data.addInquiryEstimates
    req.flash('success', 'Inquiry estimates added')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}