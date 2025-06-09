module.exports = router => {

  router.get('/main/appeals/:appealId/appeal-form', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/appeal-form/show', {
      appeal
    })
  })

  router.get('/main/appeals/:appealId/appeal-form/request-missing-information', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/appeal-form/request-missing-information/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/appeal-form/request-missing-information', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/appeal-form/request-missing-information/check`)
  })

  router.get('/main/appeals/:appealId/appeal-form/request-missing-information/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/appeal-form/request-missing-information/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/appeal-form/request-missing-information/check', function (req, res) {
    req.flash('success', 'Missing information requested')
    res.redirect(`/main/appeals/${req.params.appealId}/appeal-form`)
  })

}