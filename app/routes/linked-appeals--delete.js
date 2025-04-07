const _ = require('lodash')
const { isLeadAppeal, isChildAppeal, getLinkedAppeals } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/appeals/:appealId/linked-appeals/:linkedAppealId/delete', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let linkedAppeal = req.session.data.appeals.find(appeal => appeal.id == req.params.linkedAppealId)
    if(isLeadAppeal(linkedAppeal.id, req.session.data.linkedAppeals)) {
      res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/${req.params.linkedAppealId}/delete/new-lead-appeal`)
    } else {
      res.render('/main/appeals/linked-appeals/delete/index', {
        appeal,
        linkedAppealId: req.params.linkedAppealId
      })  
    }    
  })

  router.post('/main/appeals/:appealId/linked-appeals/:linkedAppealId/delete', function (req, res) {
    // If the linked appeal is the lead, then remove it where the child appeal is this appeal
    if(isLeadAppeal(req.params.linkedAppealId, req.session.data.linkedAppeals)) {
       _.remove(req.session.data.linkedAppeals, linkedAppeal => {
        return linkedAppeal.leadAppealId == req.params.linkedAppealId && linkedAppeal.childAppealId == req.params.appealId
      })
    }

    // If the linked appeal is a child...
    if(isChildAppeal(req.params.linkedAppealId, req.session.data.linkedAppeals)) {
      _.remove(req.session.data.linkedAppeals, linkedAppeal => {
        return linkedAppeal.childAppealId == req.params.linkedAppealId
      })
    }

    req.flash('success', 'Linked appeal removed')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })


  router.get('/main/appeals/:appealId/linked-appeals/:linkedAppealId/delete/new-lead-appeal', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
  
    // this works because I know linkedAppealId is the lead appeal
    let radios = getLinkedAppeals(req.params.linkedAppealId, req.session.data.linkedAppeals)
      .map(linkedAppeal => {
      return {
        text: linkedAppeal.id,
        value: linkedAppeal.id,
        hint: {
          text: req.session.data.appeals.find(appeal => appeal.id == linkedAppeal.id).type
        }
      }
    })

    res.render('/main/appeals/linked-appeals/delete/new-lead-appeal', {
      appeal,
      radios
    })  
     
  })

  router.post('/main/appeals/:appealId/linked-appeals/:linkedAppealId/delete/new-lead-appeal', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/${req.params.linkedAppealId}/delete/check`)
  })

  router.get('/main/appeals/:appealId/linked-appeals/:linkedAppealId/delete/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let newLeadAppeal = req.session.data.appeals.find(appeal => appeal.id == req.session.data.removeLinkedAppeal.newLeadAppealId)

    res.render('/main/appeals/linked-appeals/delete/check', {
      appeal,
      newLeadAppeal,
      linkedAppealId: req.params.linkedAppealId
    })  
  })

  router.post('/main/appeals/:appealId/linked-appeals/:linkedAppealId/delete/check', function (req, res) {
    let newLeadAppealId = req.session.data.removeLinkedAppeal.newLeadAppealId
   
    // 1. Remove the child that is becoming the lead
    _.remove(req.session.data.linkedAppeals, linkedAppeal => {
      return linkedAppeal.leadAppealId == req.params.linkedAppealId && linkedAppeal.childAppealId == newLeadAppealId
    })

    // 2. update all children to have new lead
    req.session.data.linkedAppeals.filter(linkedAppeal => {
      return linkedAppeal.leadAppealId == req.params.linkedAppealId
    }).forEach(linkedAppeal => {
      linkedAppeal.leadAppealId = newLeadAppealId
    })

   req.flash('success', 'Linked appeal removed')
   res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals`)


  })

}