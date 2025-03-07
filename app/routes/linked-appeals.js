const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/cases/:caseId/linked-appeals', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/linked-appeals/index', {
      _case
    })
  })


}