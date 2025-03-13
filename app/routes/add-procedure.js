module.exports = router => {

  router.get('/main/appeals/:appealId/add-procedure', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-procedure/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-procedure', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-procedure/check`)
  })

  router.get('/main/appeals/:appealId/add-procedure/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-procedure/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-procedure/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.procedure = req.session.data.addAppealProcedure.procedure
    req.flash('success', 'Appeal procedure added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}