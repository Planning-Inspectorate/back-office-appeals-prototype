module.exports = router => {

  router.get('/main/cases/:appealId/add-hearing', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-hearing/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-hearing', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-hearing/has-address`)
  })

  router.get('/main/cases/:appealId/add-hearing/has-address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-hearing/has-address', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-hearing/has-address', function (req, res) {
    if(req.session.data.addHearing.hasAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.appealId}/add-hearing/address`)
    } else {
      res.redirect(`/main/cases/${req.params.appealId}/add-hearing/check`)
    }
  })

  router.get('/main/cases/:appealId/add-hearing/address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-hearing/address', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-hearing/address', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-hearing/check`)
  })

  router.get('/main/cases/:appealId/add-hearing/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-hearing/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-hearing/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.hearing = req.session.data.addHearing
    application.status = 'Awaiting hearing'
    delete req.session.data.hearing
    req.flash('success', 'Hearing set up')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}