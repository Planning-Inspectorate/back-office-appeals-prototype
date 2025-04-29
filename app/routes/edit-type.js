module.exports = router => {

  router.get('/main/appeals/:appealId/edit-type', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/edit-type/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-type', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-type/must-resubmit`)
  })

  router.get('/main/appeals/:appealId/edit-type/must-resubmit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/edit-type/must-resubmit', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-type/must-resubmit', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-type/check`)
  })

  router.get('/main/appeals/:appealId/edit-type/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/edit-type/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-type/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.type = req.session.data.editType.type
    req.flash('success', 'Appeal type updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}

