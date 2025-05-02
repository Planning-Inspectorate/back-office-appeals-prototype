module.exports = router => {

  router.get('/main/appeals/:appealId/appellant-costs-decision/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/appellant-costs-decision/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/appellant-costs-decision/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/appellant-costs-decision/new/check`)
  })

  router.get('/main/appeals/:appealId/appellant-costs-decision/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/appellant-costs-decision/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/appellant-costs-decision/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.appellantCostsDecision = {
      letter: {
        name: 'appellant-cost-decision.pdf',
        size: '10MB'
      },
      issueDate: new Date()
    }

    delete req.session.data.appellantCostsDecision
    req.flash('success', 'Appellant costs decision issued')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}