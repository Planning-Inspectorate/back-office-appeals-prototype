const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/reject', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/lpa-proof-of-evidence-and-witnesses/reject/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/reject', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses/reject/check`)
  })

  router.get('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/reject/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/lpa-proof-of-evidence-and-witnesses/reject/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/reject/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.lpaProofOfEvidenceAndWitnesses.status = 'Incomplete'
    appeal.lpaProofOfEvidenceAndWitnesses.dateIncomplete = new Date()
    appeal.lpaProofOfEvidenceAndWitnesses.incompleteReason = req.session.data.rejectLPAProofOfEvidenceAndWitnesses.reason
    req.flash('success', 'LPA proof of evidence marked as incomplete')
    res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses`)
  })

}

