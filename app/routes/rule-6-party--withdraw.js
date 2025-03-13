const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:caseId/rule-6-parties/:partyId/withdraw', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-parties/withdraw/index', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:caseId/rule-6-parties/:partyId/withdraw', function (req, res) {
    res.redirect(`/main/appeals/${req.params.caseId}/rule-6-parties/${req.params.partyId}/withdraw/check`)
  })

  router.get('/main/appeals/:caseId/rule-6-parties/:partyId/withdraw/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-parties/withdraw/check', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:caseId/rule-6-parties/:partyId/withdraw/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)
    if(party.status == 'Ready to review') {
      req.flash('success', 'Request for Rule 6 status withdrawn')
    } else {
      req.flash('success', 'Rule 6 status withdrawn')
    }
    party.status = 'Withdrawn'
    party.dateWithdrawn = new Date()
    res.redirect(`/main/appeals/${req.params.caseId}/rule-6-parties/${req.params.partyId}`)
  })

}