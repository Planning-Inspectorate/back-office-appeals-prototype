const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-parties/:partyId/withdraw', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/withdraw/index', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/:partyId/withdraw', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/${req.params.partyId}/withdraw/check`)
  })

  router.get('/main/cases/:appealId/rule-6-parties/:partyId/withdraw/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/withdraw/check', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/:partyId/withdraw/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)
    if(party.status == 'Ready to review') {
      req.flash('success', 'Request for Rule 6 status withdrawn')
    } else {
      req.flash('success', 'Rule 6 status withdrawn')
    }
    party.status = 'Withdrawn'
    party.dateWithdrawn = new Date()
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/${req.params.partyId}`)
  })

}