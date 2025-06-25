const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-statements', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let rule6PartiesWithStatements = appeal.rule6Parties.filter((rule6Party) => rule6Party.statement)


    let statementsReadyToReview = rule6PartiesWithStatements.filter(party => party.statement.status == 'Ready to review')
    let statementsAccepted = rule6PartiesWithStatements.filter(party => party.statement.status == 'Accepted')
    let statementsIncomplete = rule6PartiesWithStatements.filter(party => party.statement.status == 'Incomplete')

    let statements = statementsReadyToReview.concat(statementsAccepted).concat(statementsIncomplete)



    res.render('/main/appeals/rule-6-statements/index', {
      appeal,
      statements,
      statementsReadyToReview,
      statementsAccepted,
      statementsIncomplete
    })
  })

}