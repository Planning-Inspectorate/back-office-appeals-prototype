const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/rule-6-statements', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let rule6Statements = _case.rule6Parties.filter((rule6Party) => rule6Party.statement)

     // Desired status order
    const statusOrder = ["Ready to review", "Accepted", "Rejected"];

    // Sort based on desired status order
    rule6Statements = rule6Statements.sort((a, b) => {
        const statusA = a.statement.status;
        const statusB = b.statement.status;
        return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
    });

    res.render('/main/cases/rule-6-statements/index', {
      _case,
      rule6Statements
    })
  })

}