const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-parties/:partyId/reject', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/reject/index', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/:partyId/reject', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/${req.params.partyId}/reject/check`)
  })

  router.get('/main/cases/:appealId/rule-6-parties/:partyId/reject/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/reject/check', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/:partyId/reject/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)
    party.status = 'Rejected'
    party.dateRejected = new Date()
    req.flash('success', 'Rule 6 status rejected')
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/${req.params.partyId}`)
  })

}