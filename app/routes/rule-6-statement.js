const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-statements/:partyId', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = application.rule6Parties.find(party => party.id == req.params.partyId)

    res.render('/main/cases/rule-6-statements/show', {
      application,
      party
    })
  })

}