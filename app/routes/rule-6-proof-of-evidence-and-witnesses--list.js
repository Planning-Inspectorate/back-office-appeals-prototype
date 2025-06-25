const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-proof-of-evidence-and-witnesses', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let rule6PartiesWithProofOfEvidenceAndWitnesses = appeal.rule6Parties.filter((rule6Party) => rule6Party.proofOfEvidenceAndWitnesses)

    let proofOfEvidenceAndWitnessesReadyToReview = rule6PartiesWithProofOfEvidenceAndWitnesses.filter(rule6Party => rule6Party.proofOfEvidenceAndWitnesses.status == 'Ready to review')
    let proofOfEvidenceAndWitnessesAccepted = rule6PartiesWithProofOfEvidenceAndWitnesses.filter(rule6Party => rule6Party.proofOfEvidenceAndWitnesses.status == 'Accepted')
    let proofOfEvidenceAndWitnessesIncomplete = rule6PartiesWithProofOfEvidenceAndWitnesses.filter(rule6Party => rule6Party.proofOfEvidenceAndWitnesses.status == 'Incomplete')

    res.render('/main/appeals/rule-6-proof-of-evidence-and-witnesses/index', {
      appeal,
      proofOfEvidenceAndWitnessesReadyToReview,
      proofOfEvidenceAndWitnessesAccepted,
      proofOfEvidenceAndWitnessesIncomplete
    })
  })

}