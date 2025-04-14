const { getLinkedAppeals } = require('../helpers/linked-appeals')
const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/add-decision', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-decision/index', {
      appeal,
      appealId: appeal.id
    })
  })

  router.post('/main/appeals/:appealId/add-decision', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    
    if(appeal.isLeadAppeal) {
      let firstChildAppealId = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)[0].id
      res.redirect(`/main/appeals/${req.params.appealId}/add-decision/${firstChildAppealId}`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/add-decision/decision-letter`)
    }
  })

  router.get('/main/appeals/:appealId/add-decision/decision-letter', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-decision/decision-letter', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-decision/decision-letter', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-decision/check`)
  })

  router.get('/main/appeals/:appealId/add-decision/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-decision/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-decision/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.status = 'Decision issued'
    req.flash('success', 'Decision issued')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

  router.get('/main/appeals/:appealId/add-decision/:childAppealId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-decision/child-decision', {
      appeal,
      appealId: req.params.childAppealId
    })
  })

  router.post('/main/appeals/:appealId/add-decision/:childAppealId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let linkedAppeals = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)
    var childAppealIndex = _.findIndex(linkedAppeals, {id: req.params.childAppealId})
    let nextChildAppeal = _.get(linkedAppeals, childAppealIndex + 1)

    if(nextChildAppeal) {
      res.redirect(`/main/appeals/${req.params.appealId}/add-decision/${nextChildAppeal.id}`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/add-decision/decision-letter`)
    }
  })

}