const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-parties/:partyId/approve', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/approve/index', {
      application,
      party
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/:partyId/approve', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)
    party.status = 'Approved'
    party.dateApproved = new Date()
    req.flash('success', 'Rule 6 status approved')
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/${req.params.partyId}`)
  })

}