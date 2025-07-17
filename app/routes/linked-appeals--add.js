const { v4: uuidv4 } = require('uuid')
const { isLeadAppeal, canAppealBeLinked, getLinkedAppeals, getHintText } = require('../helpers/linked-appeals')
const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/linked-appeals/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    
    res.render('/main/appeals/linked-appeals/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/linked-appeals/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let otherAppeal = req.session.data.appeals.find(appeal => appeal.id == req.session.data.addLinkedAppeal.reference)

    // Check to see if it's already linked
    if(req.session.data.linkedAppeals.find(linkedAppeal => linkedAppeal.leadAppealId === req.session.data.addLinkedAppeal.reference || linkedAppeal.childAppealId === req.session.data.addLinkedAppeal.reference)) {
      res.redirect(`/main/appeals/${appeal.id}/linked-appeals/new/exit--already-added`)
    // Checking to see if the appeal the user wants to add has the right status
    // If not, send them to the exit page
    } else if(!canAppealBeLinked(otherAppeal)) {
      res.redirect(`/main/appeals/${appeal.id}/linked-appeals/new/exit`)
    } else {
      res.redirect(`/main/appeals/${appeal.id}/linked-appeals/new/lead-appeal`)
    }
  })

  router.get('/main/appeals/:appealId/linked-appeals/new/lead-appeal', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let otherAppeal = req.session.data.appeals.find(appeal => appeal.id == req.session.data.addLinkedAppeal.reference)

    let radios = [{
      text: appeal.id + (isLeadAppeal(appeal.id, req.session.data.linkedAppeals) ? ' (current lead)': ''),
      value: appeal.id,
      hint: {
        html: getHintText(appeal)
      }
    }, {
      text: req.session.data.addLinkedAppeal.reference,
      value: req.session.data.addLinkedAppeal.reference,
      hint: {
        html: getHintText(otherAppeal)
      }
    }]

    res.render('/main/appeals/linked-appeals/new/lead-appeal', {
      appeal,
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

  function checkIfLeadAppealIsChanging(thisAppealReference, leadAppealReference, linkedAppeals) {
    return isLeadAppeal(thisAppealReference, linkedAppeals) && thisAppealReference !== leadAppealReference
  }

  router.get('/main/appeals/:appealId/linked-appeals/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let linkedAppeals = req.session.data.linkedAppeals

    // References
    let thisAppealReference = appeal.id
    let appealReference = req.session.data.addLinkedAppeal.reference
    let leadAppealReference = req.session.data.addLinkedAppeal.leadAppeal

    let relationship = getRelationship(appealReference, leadAppealReference, thisAppealReference)
    let isThisAppealTheLead = isLeadAppeal(thisAppealReference, linkedAppeals)
    let isLeadAppealChanging = checkIfLeadAppealIsChanging(thisAppealReference, leadAppealReference, linkedAppeals)

    // Appeals
    let thisAppeal = appeal
    let newLinkedAppeal = req.session.data.appeals.find(appeal => appeal.id == appealReference)
    let newLeadAppeal = req.session.data.appeals.find(appeal => appeal.id == leadAppealReference)

    res.render('/main/appeals/linked-appeals/new/check', {
      appeal,
      relationship,
      isLeadAppealx: isThisAppealTheLead,
      isLeadAppealChanging,
      thisAppeal,
      newLinkedAppeal,
      newLeadAppeal
    })
  })

  router.post('/main/appeals/:appealId/linked-appeals/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    // references
    let thisAppealReference = appeal.id
    let appealReference = req.session.data.addLinkedAppeal.reference
    let leadAppealReference = req.session.data.addLinkedAppeal.leadAppeal

    let relationship = getRelationship(appealReference, leadAppealReference, thisAppealReference)
  
    let isLeadAppealChanging = checkIfLeadAppealIsChanging(thisAppealReference, leadAppealReference, req.session.data.linkedAppeals)

    if(isLeadAppealChanging) {

      // Update other child appeals
      getLinkedAppeals(thisAppealReference, req.session.data.linkedAppeals)
        .forEach((linkedAppealToUpdate) => {
          req.session.data.linkedAppeals.find(linkedAppeal => linkedAppeal.childAppealId == linkedAppealToUpdate.id)
            .leadAppealId = relationship.leadAppealId
        })

      // Remove current lead appeal
      _.remove(req.session.data.linkedAppeals, linkedAppeal => linkedAppeal.leadAppealId === thisAppealReference)
    }

    // Add linked appeal
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

  router.get('/main/appeals/:appealId/linked-appeals/new/exit--already-added', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/linked-appeals/new/exit--already-added', {
      appeal
    })
  })

}