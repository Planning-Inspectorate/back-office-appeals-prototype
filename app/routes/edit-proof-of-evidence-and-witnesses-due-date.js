const moment = require('moment')

module.exports = router => {

  router.get('/main/appeals/:appealId/edit-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-proof-of-evidence-and-witnesses-due-date/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.proofOfEvidenceAndWitnessesDueDate = moment({
      year: req.session.data.editProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.year,
      month: req.session.data.editProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.month - 1,
      day: req.session.data.editProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.day}
    ).toISOString()
    req.flash('success', 'Proof of evidence and witnesses due date updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}