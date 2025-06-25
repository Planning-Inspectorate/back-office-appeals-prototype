const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-statements/:partyId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-statements/show', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-statements/:partyId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    if(req.session.data.reviewStatement.decision == 'Accept') {
      res.redirect(`/main/appeals/${req.params.appealId}/rule-6-statements/${req.params.partyId}/approve`)
    } else if(req.session.data.reviewStatement.decision == 'Redact and accept') {
      res.redirect(`/main/appeals/${req.params.appealId}/rule-6-statements/${req.params.partyId}/redact`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/rule-6-statements/${req.params.partyId}/reject`)
    }
  })

}