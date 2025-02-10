module.exports = router => {

  router.get('/main/cases/:appealId/cancel-inquiry', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/cancel-inquiry/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/cancel-inquiry', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    delete application.inquiry
    req.flash('success', 'Inquiry cancelled')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}