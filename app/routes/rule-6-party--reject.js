const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/rule-6-parties/:partyId/reject', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/reject/index', {
      _case,
      party
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/:partyId/reject', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/${req.params.partyId}/reject/check`)
  })

  router.get('/main/cases/:caseId/rule-6-parties/:partyId/reject/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/reject/check', {
      _case,
      party
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/:partyId/reject/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)
    party.status = 'Rejected'
    party.dateRejected = new Date()
    req.flash('success', 'Rule 6 status rejected')
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/${req.params.partyId}`)
  })

}