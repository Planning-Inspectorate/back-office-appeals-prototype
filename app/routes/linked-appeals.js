const { DateTime } = require("luxon")
const { getLinkedAppeals } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/cases/:caseId/linked-appeals', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let linkedAppeals = getLinkedAppeals(_case.id, req.session.data.linkedAppeals)

    res.render('/main/cases/linked-appeals/index', {
      _case,
      linkedAppeals
    })
  })


}