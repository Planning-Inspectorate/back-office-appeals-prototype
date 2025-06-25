const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-proof-of-evidence-and-witnesses/:partyId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-proof-of-evidence-and-witnesses/show', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-proof-of-evidence-and-witnesses/:partyId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    if(req.session.data.reviewProofOfEvidenceAndWitnesses.decision == 'Accept') {
      res.redirect(`/main/appeals/${req.params.appealId}/rule-6-proof-of-evidence-and-witnesses/${req.params.partyId}/accept`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/rule-6-proof-of-evidence-and-witnesses/${req.params.partyId}/reject`)
    }
  })

}