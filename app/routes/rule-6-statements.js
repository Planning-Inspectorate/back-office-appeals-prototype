const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-statements', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let rule6Statements = appeal.rule6Parties.filter((rule6Party) => rule6Party.statement)

     // Desired status order
    const statusOrder = ["Ready to review", "Accepted", "Rejected"];

    // Sort based on desired status order
    rule6Statements = rule6Statements.sort((a, b) => {
        const statusA = a.statement.status;
        const statusB = b.statement.status;
        return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
    });

    res.render('/main/appeals/rule-6-statements/index', {
      appeal,
      rule6Statements
    })
  })

}