const moment = require('moment')

module.exports = router => {

  router.get('/main/appeals/:caseId/add-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/add-proof-of-evidence-and-witnesses-due-date/index', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/add-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    appeal.proofOfEvidenceAndWitnessesDueDate = moment({
      year: req.session.data.addProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.year,
      month: req.session.data.addProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.month - 1,
      day: req.session.data.addProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.day}
    ).toISOString()
    req.flash('success', 'Proof of evidence and witnesses due date added')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}