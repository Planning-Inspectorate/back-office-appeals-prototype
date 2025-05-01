module.exports = router => {

  router.get('/main/appeals/:appealId/withdrawal/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/withdrawal/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/withdrawal/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/withdrawal/new/check`)
  })

  router.get('/main/appeals/:appealId/withdrawal/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/withdrawal/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/withdrawal/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.status = 'Withdrawn'
    appeal.withdrawal = {
      withdrawnDate: new Date()
    }
    delete req.session.data.withdraw
    req.flash('success', 'Appeal withdrawn')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}