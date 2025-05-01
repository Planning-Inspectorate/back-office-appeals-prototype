// const { getLinkedAppeals } = require('../helpers/linked-appeals')
// const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/withdrawal/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/withdrawal/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/withdrawal/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    // if(appeal.isLeadAppeal) {
    //   res.redirect(`/main/appeals/${req.params.appealId}/withdrawal/new/new-lead-appeal`)
    // } else {
      res.redirect(`/main/appeals/${req.params.appealId}/withdrawal/new/check`)
    // }
  })

  // router.get('/main/appeals/:appealId/withdrawal/new/new-lead-appeal', function (req, res) {
  //   let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
  
  //   // this works because I know linkedAppealId is the lead appeal
  //   let radios = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)
  //     .map(linkedAppeal => {
  //     return {
  //       text: linkedAppeal.id,
  //       value: linkedAppeal.id,
  //       hint: {
  //         text: req.session.data.appeals.find(appeal => appeal.id == linkedAppeal.id).type
  //       }
  //     }
  //   })

  //   res.render('/main/appeals/withdrawal/new/new-lead-appeal', {
  //     appeal,
  //     radios
  //   })  
     
  // })

  // router.post('/main/appeals/:appealId/withdrawal/new/new-lead-appeal', function (req, res) {
  //   res.redirect(`/main/appeals/${req.params.appealId}/withdrawal/new/check`)
  // })


  router.get('/main/appeals/:appealId/withdrawal/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/withdrawal/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/withdrawal/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.status = 'Withdrawn'
    
    // let newLeadAppealId = req.session.data.withdraw?.newLeadAppealId

    // if(newLeadAppealId) {
    //   // 1. Remove the child that is becoming the lead
    //   _.remove(req.session.data.linkedAppeals, linkedAppeal => {
    //     return linkedAppeal.leadAppealId == appeal.id && linkedAppeal.childAppealId == newLeadAppealId
    //   })

    //   // 2. update all children to have new lead
    //   req.session.data.linkedAppeals.filter(linkedAppeal => {
    //     return linkedAppeal.leadAppealId == appeal.id
    //   }).forEach(linkedAppeal => {
    //     linkedAppeal.leadAppealId = newLeadAppealId
    //   })
    // }
    
    delete req.session.data.withdraw
    req.flash('success', 'Appeal withdrawn')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}