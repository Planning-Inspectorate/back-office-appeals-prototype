const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:appealId/edit-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/edit-proof-of-evidence-and-witnesses-due-date/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.proofOfEvidenceAndWitnessesDueDate = moment({
      year: req.session.data.editProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.year,
      month: req.session.data.editProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.month - 1,
      day: req.session.data.editProofOfEvidenceAndWitnessesDueDate.proofOfEvidenceAndWitnessesDueDate.day}
    ).toISOString()
    req.flash('success', 'Proof of evidence and witnesses due date updated')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}