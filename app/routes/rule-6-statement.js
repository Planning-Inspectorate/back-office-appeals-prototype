const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/rule-6-statements/:partyId', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-statements/show', {
      _case,
      party
    })
  })

}