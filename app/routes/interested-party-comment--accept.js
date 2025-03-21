const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-proof-of-evidence-and-witnesses/:partyId/accept', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-proof-of-evidence-and-witnesses/accept/index', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-proof-of-evidence-and-witnesses/:partyId/accept', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)
    party.proofOfEvidenceAndWitnesses.status = 'Accepted'
    party.proofOfEvidenceAndWitnesses.dateAccepted = new Date()
    req.flash('success', 'Rule 6 proof of evidence and witnesses accepted')
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-proof-of-evidence-and-witnesses`)
  })

}



