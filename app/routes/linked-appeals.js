const { getLinkedAppeals, isLeadAppeal } = require('../helpers/linked-appeals')
module.exports = router => {

  router.get('/main/appeals/:appealId/linked-appeals', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let linkedAppeals = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)
      // exclude ‘this appeal’
      .filter(linkedAppeal => linkedAppeal.id != appeal.id)
      .map(item => {
        let appeal = req.session.data.appeals.find(appeal => appeal.id == item.id)
        appeal.isLeadAppeal = isLeadAppeal(appeal.id, req.session.data.linkedAppeals)
        return appeal
      })

    res.render('/main/appeals/linked-appeals/index', {
      appeal,
      linkedAppeals
    })
  })
}