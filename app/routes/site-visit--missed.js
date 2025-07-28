module.exports = router => {

  router.get('/main/appeals/:appealId/site-visit/missed', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/site-visit/missed/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/site-visit/missed', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    req.flash('success', 'No show recorded')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}
