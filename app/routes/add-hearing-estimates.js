module.exports = router => {

  router.get('/main/appeals/:appealId/add-hearing-estimates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-hearing-estimates/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-hearing-estimates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-hearing-estimates/check`)
  })

  router.get('/main/appeals/:appealId/add-hearing-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-hearing-estimates/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-hearing-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.hearingEstimates = req.session.data.addHearingEstimates
    delete req.session.data.addHearingEstimates
    req.flash('success', 'Hearing estimates added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}