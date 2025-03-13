const { DateTime } = require("luxon")
const { getLinkedAppeals } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/appeals/:caseId/linked-appeals', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)

    let linkedAppeals = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)

    res.render('/main/appeals/linked-appeals/index', {
      appeal,
      linkedAppeals
    })
  })


}