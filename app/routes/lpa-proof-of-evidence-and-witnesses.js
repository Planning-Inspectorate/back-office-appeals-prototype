const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/lpa-proof-of-evidence-and-witnesses/show', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/lpa-proof-of-evidence-and-witnesses', function (req, res) {
    if(req.session.data.reviewProofOfEvidenceAndWitnesses.decision == 'Accept') {
      res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses/accept`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/lpa-proof-of-evidence-and-witnesses/reject`)
    }
  })

}