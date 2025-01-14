module.exports = router => {

  router.get('/main/cases/:appealId/start-case', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/start-case/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/start-case/check`)
  })

  router.get('/main/cases/:appealId/start-case/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/start-case/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.status = 'Ready to validate'
    application.procedure = req.session.data.procedure
    req.flash('success', 'Case started')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}