module.exports = router => {

  router.get('/main/appeals/:appealId/cancel', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/cancel/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/cancel', function (req, res) {
    if(req.session.data.cancel.reason == 'Appeal invalid') {
      res.redirect(`/main/appeals/${req.params.appealId}/invalid/new`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/withdrawal/new`)
    }
  })

  router.get('/main/appeals/:appealId/cancel/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/cancel/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/cancel/check', function (req, res) {
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