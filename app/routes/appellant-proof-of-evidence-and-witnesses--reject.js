const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/appellant-proof-of-evidence-and-witnesses/reject', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/appellant-proof-of-evidence-and-witnesses/reject/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/appellant-proof-of-evidence-and-witnesses/reject', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/appellant-proof-of-evidence-and-witnesses/reject/check`)
  })

  router.get('/main/appeals/:appealId/appellant-proof-of-evidence-and-witnesses/reject/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/appellant-proof-of-evidence-and-witnesses/reject/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/appellant-proof-of-evidence-and-witnesses/reject/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.appellantProofOfEvidenceAndWitnesses.status = 'Incomplete'
    appeal.appellantProofOfEvidenceAndWitnesses.dateIncomplete = new Date()
    req.flash('success', 'Appellant proof of evidence marked as incomplete')
    res.redirect(`/main/appeals/${req.params.appealId}/appellant-proof-of-evidence-and-witnesses`)
  })

}

