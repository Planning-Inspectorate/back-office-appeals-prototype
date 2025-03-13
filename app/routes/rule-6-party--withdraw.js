const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/rule-6-parties/:partyId/withdraw', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/withdraw/index', {
      _case,
      party
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/:partyId/withdraw', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/${req.params.partyId}/withdraw/check`)
  })

  router.get('/main/cases/:caseId/rule-6-parties/:partyId/withdraw/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/withdraw/check', {
      _case,
      party
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/:partyId/withdraw/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)
    if(party.status == 'Ready to review') {
      req.flash('success', 'Request for Rule 6 status withdrawn')
    } else {
      req.flash('success', 'Rule 6 status withdrawn')
    }
    party.status = 'Withdrawn'
    party.dateWithdrawn = new Date()
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/${req.params.partyId}`)
  })

}