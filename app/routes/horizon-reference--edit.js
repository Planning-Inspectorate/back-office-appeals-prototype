module.exports = router => {

  router.get('/main/appeals/:appealId/horizon-reference/edit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/horizon-reference/edit/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/horizon-reference/edit', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/horizon-reference/edit/check`)
  })

  router.get('/main/appeals/:appealId/horizon-reference/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/horizon-reference/edit/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/horizon-reference/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.horizonReference = req.session.data.editHorizonReference.reference
    delete req.session.data.editHorizonReference
    req.flash('success', 'Horizon reference updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}