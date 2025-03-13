const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:caseId/rule-6-statements/:partyId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    let party = appeal.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/appeals/rule-6-statements/show', {
      appeal,
      party
    })
  })

}