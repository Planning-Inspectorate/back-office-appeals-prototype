module.exports = router => {

  router.get('/main/appeals/:appealId/cancel-inquiry', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/cancel-inquiry/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/cancel-inquiry', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    delete appeal.inquiry
    req.flash('success', 'Inquiry cancelled')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}