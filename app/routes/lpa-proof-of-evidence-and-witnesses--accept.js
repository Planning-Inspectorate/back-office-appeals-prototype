const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/accept', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/lpa-proof-of-evidence-and-witnesses/accept/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses/accept', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.lpaProofOfEvidenceAndWitnesses.status = 'Accepted'
    appeal.lpaProofOfEvidenceAndWitnesses.dateAccepted = new Date()
    req.flash('success', 'LPA proof of evidence and witnesses accepted')
    res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses`)
  })

}



