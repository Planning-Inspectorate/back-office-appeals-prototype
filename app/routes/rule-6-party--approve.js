const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/rule-6-parties/:partyId/approve', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/approve/index', {
      _case,
      party
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/:partyId/approve', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)
    party.status = 'Approved'
    party.dateApproved = new Date()
    req.flash('success', 'Rule 6 status approved')
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/${req.params.partyId}`)
  })

}