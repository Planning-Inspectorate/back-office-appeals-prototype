const { v4: uuidv4 } = require('uuid')
const { isLeadAppeal, canAppealBeLinked } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/appeals/:appealId/linked-appeals/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    
    res.render('/main/appeals/linked-appeals/new/index', {
      appeal,
      isLeadAppeal: isLeadAppeal(appeal.id, req.session.data.linkedAppeals)
    })
  })

  router.post('/main/appeals/:appealId/linked-appeals/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.session.data.addLinkedAppeal.reference)
    if(!canAppealBeLinked(appeal)) {
      res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/new/exit`)
    } else if(isLeadAppeal(req.params.appealId, req.session.data.linkedAppeals)) {
      res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/new/lead-appeal`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/new/lead-appeal`)
    }
  })

  router.get('/main/appeals/:appealId/linked-appeals/new/lead-appeal', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let otherAppeal = req.session.data.appeals.find(appeal => appeal.id == req.session.data.addLinkedAppeal.reference)

    let radios = [{
      text: appeal.id + (isLeadAppeal(appeal.id, req.session.data.linkedAppeals) ? ' (current lead)': ''),
      value: appeal.id,
      hint: {
        text: appeal.type
      }
    }, {
      text: req.session.data.addLinkedAppeal.reference,
      value: req.session.data.addLinkedAppeal.reference,
      hint: {
        text: otherAppeal.type
      }
    }]

    res.render('/main/appeals/linked-appeals/new/lead-appeal', {
      appeal,
      isLeadAppeal: isLeadAppeal(appeal.id, req.session.data.linkedAppeals),
      radios
    })
  })

  router.post('/main/appeals/:appealId/linked-appeals/new/lead-appeal', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/new/check`)
  })

  // appealReference = what the user typed in the box
  // leadAppealReference = the radio button they selected
  // thisAppealReference = the reference of the appeal where the user clicked ‘Add linked appeal’ on
  function getRelationship(appealReference, leadAppealReference, thisAppealReference) {
    if(leadAppealReference) {
      // in this case, the typed-in appeal is the lead
      // so THIS appeal should be the child
      if(leadAppealReference == appealReference) {
        return {
          leadAppealId: leadAppealReference,
          childAppealId: thisAppealReference
        }
      // in this case, the typed-in appeal is the child
      // so the lead appeal is THIS appeal (but I’m taking it from the radio button)
      } else {
        return {
          leadAppealId: leadAppealReference,
          childAppealId: appealReference
        }
      }
    // in this case, a second appeal is being added to the lead
    // so the lead appeal is THIS appeal
    // and the child is what the user typed in
    } else {
      return {
        leadAppealId: thisAppealReference,
        childAppealId: appealReference
      }
    }
  }

  router.get('/main/appeals/:appealId/linked-appeals/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let appealReference = req.session.data.addLinkedAppeal.reference
    let leadAppealReference = req.session.data.addLinkedAppeal.leadAppeal
    let thisAppealReference = appeal.id
    let relationship = getRelationship(appealReference, leadAppealReference, thisAppealReference)
    
    let isThisAppealTheLead = isLeadAppeal(appeal.id, req.session.data.linkedAppeals)
    let willOtherChildAppealsBeMoved = false
    if(isThisAppealTheLead && appeal.id !== leadAppealReference) {
      willOtherChildAppealsBeMoved = true
    }

    let thisAppeal = appeal
    let newLinkedAppeal = req.session.data.appeals.find(appeal => appeal.id == appealReference)
    let newLeadAppeal = req.session.data.appeals.find(appeal => appeal.id == leadAppealReference)

    res.render('/main/appeals/linked-appeals/new/check', {
      appeal,
      relationship,
      isLeadAppeal: isThisAppealTheLead,
      willOtherChildAppealsBeMoved,
      thisAppeal,
      newLinkedAppeal,
      newLeadAppeal
    })
  })

  router.post('/main/appeals/:appealId/linked-appeals/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let appealReference = req.session.data.addLinkedAppeal.reference
    let leadAppealReference = req.session.data.addLinkedAppeal.leadAppeal
    let thisAppealReference = appeal.id

    let relationship = getRelationship(appealReference, leadAppealReference, thisAppealReference)
    req.session.data.linkedAppeals.push({
      id: uuidv4(),
      leadAppealId: relationship.leadAppealId,
      childAppealId: relationship.childAppealId
    })

    delete req.session.data.addLinkedAppeal
    req.flash('success', 'Linked appeal added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

  router.get('/main/appeals/:appealId/linked-appeals/new/exit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/linked-appeals/new/exit', {
      appeal,
      isLeadAppeal: isLeadAppeal(appeal.id, req.session.data.linkedAppeals)
    })
  })

}