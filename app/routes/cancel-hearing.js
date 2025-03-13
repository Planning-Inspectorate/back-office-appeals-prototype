module.exports = router => {

  router.get('/main/appeals/:appealId/cancel-hearing', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/cancel-hearing/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/cancel-hearing', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    delete appeal.hearing
    req.flash('success', 'Hearing cancelled')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}