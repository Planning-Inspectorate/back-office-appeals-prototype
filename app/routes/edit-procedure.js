module.exports = router => {

  router.get('/main/cases/:appealId/edit-procedure', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/edit-procedure/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-procedure', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/edit-procedure/check`)
  })

  router.get('/main/cases/:appealId/edit-procedure/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/edit-procedure/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-procedure/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.procedure = req.session.data.editAppealProcedure.procedure
    req.flash('success', 'Appeal procedure updated')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}