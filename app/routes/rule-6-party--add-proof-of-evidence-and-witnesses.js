module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/add-proof-of-evidence-and-witnesses', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-parties/add-proof-of-evidence-and-witnesses/index', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/add-proof-of-evidence-and-witnesses', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/add-proof-of-evidence-and-witnesses/witnesses`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/add-proof-of-evidence-and-witnesses/witnesses', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-parties/add-proof-of-evidence-and-witnesses/witnesses', {
      appeal,
      party
    })
  })


  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/add-proof-of-evidence-and-witnesses/witnesses', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/add-proof-of-evidence-and-witnesses/check`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/add-proof-of-evidence-and-witnesses/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-parties/add-proof-of-evidence-and-witnesses/check', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/add-proof-of-evidence-and-witnesses/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)
    req.flash('success', 'Rule 6 proof of evidence and witnesses added')

    party.proofOfEvidenceAndWitnesses = {
      dateReceived: new Date(),
      status: 'Ready to review',
      evidenceAndSummary: [{
        name: 'summary.pdf',
        size: '5MB'
      }],
      witnessesAndSummary: [{
        name: 'witnesses.pdf',
        size: '5MB'
      }]
    }

    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}`)
  })

}