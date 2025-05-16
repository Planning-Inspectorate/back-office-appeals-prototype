module.exports = router => {

  router.get('/main/appeals/:appealId/horizon-reference/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/horizon-reference/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/horizon-reference/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/horizon-reference/new/check`)
  })

  router.get('/main/appeals/:appealId/horizon-reference/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/horizon-reference/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/horizon-reference/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.horizonReference = req.session.data.addHorizonReference.reference
    delete req.session.data.addHorizonReference
    appeal.status = 'Transferred'
    req.flash('success', 'Appeal marked as transferred')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}