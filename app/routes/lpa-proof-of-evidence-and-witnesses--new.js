module.exports = router => {

  router.get('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/lpa-proof-of-evidence-and-witnesses/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses/new/has-witnesses`)
  })

  router.get('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/new/has-witnesses', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/lpa-proof-of-evidence-and-witnesses/new/has-witnesses', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/new/has-witnesses', function (req, res) {
    if(req.session.data.addLPAProofOfEvidenceAndWitnesses.hasWitnesses == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses/new/witnesses`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses/new/check`)
    }
  })

  router.get('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/new/witnesses', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/lpa-proof-of-evidence-and-witnesses/new/witnesses', {
      appeal
    })
  })


  router.post('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/new/witnesses', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses/new/check`)
  })

  router.get('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/lpa-proof-of-evidence-and-witnesses/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    req.flash('success', 'LPA proof of evidence and witnesses added')

    appeal.lpaProofOfEvidenceAndWitnesses = {
      dateReceived: new Date(),
      status: 'Ready to review',
      evidenceAndSummary: [{
        name: 'summary.pdf',
        size: '5MB'
      }],
      hasWitnesses: req.session.data.addLPAProofOfEvidenceAndWitnesses.hasWitnesses
    }

    if(req.session.data.addLPAProofOfEvidenceAndWitnesses.hasWitnesses == 'Yes') {
      appeal.lpaProofOfEvidenceAndWitnesses.witnessesAndSummary = [{
        name: 'witnesses.pdf',
        size: '5MB'
      }]
    }

    res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses`)
  })

}