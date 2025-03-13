const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/rule-6-statements/:partyId/redact', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-statements/redact/index', {
      _case,
      party
    })
  })

  router.post('/main/cases/:caseId/rule-6-statements/:partyId/redact', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-statements/${req.params.partyId}/redact/check`)
  })

  router.get('/main/cases/:caseId/rule-6-statements/:partyId/redact/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-statements/redact/check', {
      _case,
      party
    })
  })

  router.post('/main/cases/:caseId/rule-6-statements/:partyId/redact/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)
    party.statement.status = 'Accepted'
    party.statement.dateApproved = new Date()
    req.flash('success', 'Rule 6 statement accepted')
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-statements/${req.params.partyId}`)
  })

}
