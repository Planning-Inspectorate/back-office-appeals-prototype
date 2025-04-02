const { getLinkedAppeals } = require('../helpers/linked-appeals')
// const { isLeadAppeal } = require('../helpers/linked-appeals')
module.exports = router => {

  router.get('/main/appeals/:appealId/linked-appeals', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    // appeal.isLeadAppeal = isLeadAppeal(appeal.id, req.session.data.linkedAppeals)

    let linkedAppeals = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)

    res.render('/main/appeals/linked-appeals/index', {
      appeal,
      linkedAppeals
    })
  })


}