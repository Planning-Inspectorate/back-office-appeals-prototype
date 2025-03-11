const { DateTime } = require("luxon")
const { v4: uuidv4 } = require('uuid')
const { getLinkedAppeals, isLeadAppeal } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/cases/:caseId/linked-appeals/new', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/linked-appeals/new/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/linked-appeals/new', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    if(isLeadAppeal(_case.id, req.session.data.linkedAppeals)) {
      res.redirect(`/main/cases/${req.params.caseId}/linked-appeals/new/check`)
    } else {
      res.redirect(`/main/cases/${req.params.caseId}/linked-appeals/new/lead-appeal`)
    }
  })

  router.get('/main/cases/:caseId/linked-appeals/new/lead-appeal', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let radios = [{
      text: _case.id,
      value: _case.id
    }, {
      text: req.session.data.addLinkedAppeal.reference,
      value: req.session.data.addLinkedAppeal.reference
    }]

    // const linkedAppeals = getLinkedAppeals(_case.id, req.session.data.linkedAppeals)

    // radios = radios.concat(linkedAppeals.map(linkedAppeal => {
    //   return {
    //     text: linkedAppeal.id,
    //     value: linkedAppeal.id
    //   }
    // }))


    // loop through all of them and mark the lead
    // radios = radios.map(radio => {
    //   if(isLeadAppeal(radio.value, req.session.data.linkedAppeals)) {
    //     return {
    //       text: radio.text + ' (Current)',
    //       value: radio.value
    //     }
    //   }

    //   return radio
    // })

    // radios.sort((a, b) => {
    //   return b.text.includes("(Current)") - a.text.includes("(Current)");
    // })

    res.render('/main/cases/linked-appeals/new/lead-appeal', {
      _case,
      radios
    })
  })

  router.post('/main/cases/:caseId/linked-appeals/new/lead-appeal', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/linked-appeals/new/check`)
  })

  router.get('/main/cases/:caseId/linked-appeals/new/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/linked-appeals/new/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/linked-appeals/new/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let appealReference = req.session.data.addLinkedAppeal.reference
    let leadAppealReference = req.session.data.addLinkedAppeal.leadAppeal



    // if you’re making the appeal reference that you typed in the lead
    // then the current appeal should be the child
    if(leadAppealReference == appealReference) {
      req.session.data.linkedAppeals.push({
        id: uuidv4(),
        leadAppealId: leadAppealReference,
        childAppealId: _case.id
      })

      // TODO
      // If the childAppealId is a lead already
      // It needs to be removed as a lead
      // And all it’s children need to have a new lead to match the new lead


    } else {
      // otherwise the reference is the child and the lead is the lead
      req.session.data.linkedAppeals.push({
        id: uuidv4(),
        leadAppealId: req.session.data.addLinkedAppeal.leadAppeal,
        childAppealId: req.session.data.addLinkedAppeal.reference
      })
    }

    delete req.session.data.addLinkedAppeal
    req.flash('success', 'Appeal linked')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}