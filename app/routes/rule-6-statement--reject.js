const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-statements/:partyId/reject', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-statements/reject/index', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-statements/:partyId/reject', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-statements/${req.params.partyId}/reject/can-resubmit`)
  })

  router.get('/main/cases/:appealId/rule-6-statements/:partyId/reject/can-resubmit', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-statements/reject/can-resubmit', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-statements/:partyId/reject/can-resubmit', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-statements/${req.params.partyId}/reject/check`)
  })

  router.get('/main/cases/:appealId/rule-6-statements/:partyId/reject/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-statements/reject/check', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-statements/:partyId/reject/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)
    party.statement.status = 'Rejected'
    party.statement.dateRejected = new Date()
    req.flash('success', 'Rule 6 statement rejected')
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-statements/${req.params.partyId}`)
  })

}

