module.exports = router => {

  router.get('/main/appeals/:appealId/edit-type', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    if(!['Ready to assign case officer', 'Ready to validate', 'Ready to start'].includes(appeal.type)) {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-type/exit`)
    } else {
      res.render('/main/appeals/edit-type/index', {
        appeal
      })
    }
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
      res.redirect(`/main/appeals/${req.params.appealId}/edit-type/invalid`)
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

  router.get('/main/appeals/:appealId/edit-type/exit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/edit-type/exit', {
      appeal
    })
  })

  router.get('/main/appeals/:appealId/edit-type/invalid', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/edit-type/invalid', {
      appeal
    })
  })

  router.get('/main/appeals/:appealId/edit-type/resubmit-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/edit-type/resubmit-date', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-type/resubmit-date', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-type/check`)
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

    if(req.session.data.editType.mustResubmit == 'Yes') {
      req.flash('success', 'Appeal marked as invalid')
      appeal.status = 'Invalid'
    } else {
      req.flash('success', 'Appeal type updated')
      appeal.type = req.session.data.editType.type
    }
    
    delete req.session.data.editType
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}

