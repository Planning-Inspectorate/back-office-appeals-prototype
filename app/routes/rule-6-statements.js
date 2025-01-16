const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-statements', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let rule6Statements = application.rule6Parties.filter((rule6Party) => rule6Party.statement)

     // Desired status order
    const statusOrder = ["Ready to review", "Accepted", "Rejected"];

    // Sort based on desired status order
    rule6Statements = rule6Statements.sort((a, b) => {
        const statusA = a.statement.status;
        const statusB = b.statement.status;
        return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
    });

    res.render('/main/cases/rule-6-statements/index', {
      application,
      rule6Statements
    })
  })

}