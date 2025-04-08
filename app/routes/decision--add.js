module.exports = router => {

  router.get('/main/appeals/:appealId/add-decision', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-decision/index', {
      appeal,
      appealId: appeal.id
    })
  })

  router.post('/main/appeals/:appealId/add-decision', function (req, res) {
    // get first child appeal and redirect there
    res.redirect(`/main/appeals/${req.params.appealId}/add-decision/${appealId}`)
  })

  router.get('/main/appeals/:appealId/add-decision/:childAppealId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-decision/index', {
      appeal,
      appealId: req.params.childAppealId
    })
  })

  router.post('/main/appeals/:appealId/add-decision', function (req, res) {
    // get next child appeal and redirect there
    // or go to the check answers page if there is none
    res.redirect(`/main/appeals/${req.params.appealId}/add-decision/${appealId}`)
  })

  router.get('/main/appeals/:appealId/add-decision/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-decision/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-decision/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.status = 'Decision issued'
    req.flash('success', 'Decision issued')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}