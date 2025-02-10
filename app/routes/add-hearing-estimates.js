module.exports = router => {

  router.get('/main/cases/:appealId/add-hearing-estimates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-hearing-estimates/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-hearing-estimates', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-hearing-estimates/check`)
  })

  router.get('/main/cases/:appealId/add-hearing-estimates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-hearing-estimates/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-hearing-estimates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.hearingEstimates = req.session.data.addHearingEstimates
    delete req.session.data.addHearingEstimates
    req.flash('success', 'Hearing estimates added')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}