module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-parties/:partyId', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-parties/show', {
      application,
      party
    })
  })

}