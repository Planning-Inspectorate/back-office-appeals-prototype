const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:caseId/add-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-proof-of-evidence-and-witnesses-due-date/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.proofOfEvidenceAndWitnessesDueDate = moment({
      year: req.session.data.addProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.year,
      month: req.session.data.addProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.month - 1,
      day: req.session.data.addProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.day}
    ).toISOString()
    req.flash('success', 'Proof of evidence and witnesses due date added')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}