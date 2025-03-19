const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-statements/:partyId/reject', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-statements/reject/index', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-statements/:partyId/reject', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-statements/${req.params.partyId}/reject/can-resubmit`)
  })

  router.get('/main/appeals/:appealId/rule-6-statements/:partyId/reject/can-resubmit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-statements/reject/can-resubmit', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-statements/:partyId/reject/can-resubmit', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-statements/${req.params.partyId}/reject/check`)
  })

  router.get('/main/appeals/:appealId/rule-6-statements/:partyId/reject/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-statements/reject/check', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-statements/:partyId/reject/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)
    party.statement.status = 'Rejected'
    party.statement.dateRejected = new Date()
    req.flash('success', 'Rule 6 statement rejected')
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-statements`)
  })

}

