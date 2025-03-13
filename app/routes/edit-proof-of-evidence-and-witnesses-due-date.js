const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:caseId/edit-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-proof-of-evidence-and-witnesses-due-date/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.proofOfEvidenceAndWitnessesDueDate = moment({
      year: req.session.data.editProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.year,
      month: req.session.data.editProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.month - 1,
      day: req.session.data.editProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.day}
    ).toISOString()
    req.flash('success', 'Proof of evidence and witnesses due date updated')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}