const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-statements/:partyId/redact', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-statements/redact/index', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-statements/:partyId/redact', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-statements/${req.params.partyId}/redact/check`)
  })

  router.get('/main/cases/:appealId/rule-6-statements/:partyId/redact/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-statements/redact/check', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-statements/:partyId/redact/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)
    party.statement.status = 'Accepted'
    party.statement.dateApproved = new Date()
    req.flash('success', 'Rule 6 statement accepted')
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-statements/${req.params.partyId}`)
  })

}
