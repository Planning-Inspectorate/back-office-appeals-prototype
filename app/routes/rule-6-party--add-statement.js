module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/add-statement', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-parties/add-statement/index', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/add-statement', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/add-statement/supporting-documents`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/add-statement/supporting-documents', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-parties/add-statement/supporting-documents', {
      appeal,
      party
    })
  })


  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/add-statement/supporting-documents', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/add-statement/check`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/add-statement/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-parties/add-statement/check', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/add-statement/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)
    let statement = req.session.data.addRule6Statement
    req.flash('success', 'Rule 6 statement added')

    party.statement = {
      dateReceived: new Date(),
      status: 'Ready to review',
      statement: statement.statement,
      documents: [{
        name: 'supporting-document-01.doc',
        size: '5MB'
      }]
    }

    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}`)
  })

}