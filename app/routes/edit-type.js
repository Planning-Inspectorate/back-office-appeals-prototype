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
    if(req.session.data.editType.mustResubmit == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-type/check`)
    } else {
      if([
        'Householder', 
        'Planning', 
        'Planned listed building and conservation area', 
        'Advertisement', 
        'Commercial planning (CAS)', 
        'Commercial advertisement (CAS)'
      ].includes(req.session.data.editType.type)) {
        res.redirect(`/main/appeals/${req.params.appealId}/edit-type/check`)
      } else {
        res.redirect(`/main/appeals/${req.params.appealId}/edit-type/transfer`)
      }
    }
  })

  router.get('/main/appeals/:appealId/edit-type/transfer', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/edit-type/transfer', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-type/transfer', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.status = 'Awaiting transfer'
    req.flash('success', 'Appeal marked as awaiting transfer')
    res.redirect(`/main/appeals/${req.params.appealId}`)
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
    delete req.session.data.editType
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}

