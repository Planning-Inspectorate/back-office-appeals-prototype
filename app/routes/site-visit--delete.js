module.exports = router => {

  router.get('/main/appeals/:appealId/site-visit/delete', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/site-visit/delete/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/site-visit/delete', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    delete appeal.siteVisit
    req.flash('success', 'Site visit cancelled')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}