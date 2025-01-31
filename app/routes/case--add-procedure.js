module.exports = router => {

  router.get('/main/cases/:appealId/add-procedure', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-procedure/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-procedure', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-procedure/check`)
  })

  router.get('/main/cases/:appealId/add-procedure/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-procedure/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-procedure/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.procedure = req.session.data.addAppealProcedure.procedure
    req.flash('success', 'Appeal procedure added')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}