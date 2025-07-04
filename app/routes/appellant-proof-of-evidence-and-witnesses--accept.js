const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/appellant-proof-of-evidence-and-witnesses/accept', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/appellant-proof-of-evidence-and-witnesses/accept/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/appellant-proof-of-evidence-and-witnesses/accept', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.appellantProofOfEvidenceAndWitnesses.status = 'Accepted'
    appeal.appellantProofOfEvidenceAndWitnesses.dateAccepted = new Date()
    req.flash('success', 'Appellant proof of evidence and witnesses accepted')
    res.redirect(`/main/appeals/${req.params.appealId}/appellant-proof-of-evidence-and-witnesses`)
  })

}



