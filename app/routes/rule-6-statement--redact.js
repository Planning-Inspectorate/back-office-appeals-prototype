const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-statements/:partyId/redact', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-statements/redact/index', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-statements/:partyId/redact', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-statements/${req.params.partyId}/redact/check`)
  })

  router.get('/main/appeals/:appealId/rule-6-statements/:partyId/redact/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-statements/redact/check', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-statements/:partyId/redact/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)
    party.statement.status = 'Accepted'
    party.statement.dateApproved = new Date()
    req.flash('success', 'Rule 6 statement accepted')
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-statements/${req.params.partyId}`)
  })

}
