module.exports = router => {

  router.get('/main/cases/:caseId/rule-6-parties/:partyId', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let party = _case.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/show', {
      _case,
      party
    })
  })

}