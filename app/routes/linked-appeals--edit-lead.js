const _ = require('lodash')
const { isLeadAppeal } = require('../helpers/linked-appeals')
const { v4: uuidv4 } = require('uuid')

module.exports = router => {

  router.get('/main/appeals/:appealId/linked-appeals/edit-lead', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let allLinkedAppeals = req.session.data.linkedAppeals

    let leadAppeal
    if(isLeadAppeal(appeal.id, allLinkedAppeals)) {
      leadAppeal = appeal
    } else {
      // if it's not the lead, then get its lead appeal id
      let leadAppealId = allLinkedAppeals.find(linkedAppeal => linkedAppeal.childAppealId == appeal.id).leadAppealId
      leadAppeal = req.session.data.appeals.find(appeal => appeal.id == leadAppealId)
    }

    // get all the linked appeals
    let radios = allLinkedAppeals.filter(linkedAppeal => linkedAppeal.leadAppealId == leadAppeal.id)
      .map(linkedAppeal => {
        return {
          text: linkedAppeal.childAppealId,
          value: linkedAppeal.childAppealId,
          hint: {
            text: req.session.data.appeals.find(appeal => appeal.id == linkedAppeal.childAppealId).type
          }
        }
      })

    // check if there's only one child appeal
    // if so then redirect to a confirmation screen
    if(radios.length == 1) {allLinkedAppeals
      res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/edit-lead/confirm`)
      return
    }


    res.render('/main/appeals/linked-appeals/edit-lead/index', {
      appeal,
      radios
    })  
  
  })

  router.post('/main/appeals/:appealId/linked-appeals/edit-lead', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/edit-lead/check`)
  })

  router.get('/main/appeals/:appealId/linked-appeals/edit-lead/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let newLeadAppeal = req.session.data.appeals.find(appeal => appeal.id == req.session.data.editLeadAppeal.newLeadAppealId)

    res.render('/main/appeals/linked-appeals/edit-lead/check', {
      appeal,
      newLeadAppeal
    })  
  })

  router.post('/main/appeals/:appealId/linked-appeals/edit-lead/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let allLinkedAppeals = req.session.data.linkedAppeals
    let newLeadAppealId = req.session.data.editLeadAppeal.newLeadAppealId
   
    let leadAppeal
    if(isLeadAppeal(appeal.id, allLinkedAppeals)) {
      leadAppeal = appeal
    } else {
      // if it's not the lead, then get it’s lead appeal id
      let leadAppealId = allLinkedAppeals.find(linkedAppeal => linkedAppeal.childAppealId == appeal.id).leadAppealId
      leadAppeal = req.session.data.appeals.find(appeal => appeal.id == leadAppealId)
    }

    // update all linked appeals to have the new lead
    allLinkedAppeals
      .filter(linkedAppeal => linkedAppeal.leadAppealId == leadAppeal.id)
      .forEach(linkedAppeal => {
        linkedAppeal.leadAppealId = newLeadAppealId
      })

    // because of the above there will be some linked appeals
    // where the lead and child are the same
    // so remove those ones
    _.remove(allLinkedAppeals, linkedAppeal => {
      return linkedAppeal.leadAppealId == linkedAppeal.childAppealId
    })

    // Finally add the new linked appeal
    // where the child = current lead appeal
    // and the lead = new lead appeal
    allLinkedAppeals.push({
      id: uuidv4(),
      leadAppealId: newLeadAppealId,
      childAppealId: leadAppeal.id
    })

   req.flash('success', 'Lead appeal updated')
   res.redirect(`/main/appeals/${req.params.appealId}`)
  })

  router.get('/main/appeals/:appealId/linked-appeals/edit-lead/confirm', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let newLeadAppeal
    if(appeal.isLeadAppeal) {
      newLeadAppeal = req.session.data.linkedAppeals.find(linkedAppeal => linkedAppeal.leadAppealId == appeal.id).childAppealId
    } else {
      newLeadAppeal = appeal.id
    }

    res.render('/main/appeals/linked-appeals/edit-lead/confirm', {
      appeal,
      newLeadAppeal
    })  
  })

}