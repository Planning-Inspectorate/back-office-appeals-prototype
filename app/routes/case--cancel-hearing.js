module.exports = router => {

  router.get('/main/cases/:appealId/cancel-hearing', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/cancel-hearing/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/cancel-hearing', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    delete application.hearing
    req.flash('success', 'Hearing cancelled')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}