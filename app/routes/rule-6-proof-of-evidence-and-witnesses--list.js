const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-proof-of-evidence-and-witnesses', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let proofOfEvidenceAndWitnesses = appeal.rule6Parties.filter((rule6Party) => rule6Party.proofOfEvidenceAndWitnesses)

     // Desired status order
    const statusOrder = ["Ready to review", "Accepted", "Rejected"];

    // Sort based on desired status order
    proofOfEvidenceAndWitnesses = proofOfEvidenceAndWitnesses.sort((a, b) => {
        const statusA = a.proofOfEvidenceAndWitnesses.status;
        const statusB = b.proofOfEvidenceAndWitnesses.status;
        return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
    });

    res.render('/main/appeals/rule-6-proof-of-evidence-and-witnesses/index', {
      appeal,
      proofOfEvidenceAndWitnesses
    })
  })

}