const { v4: uuidv4 } = require('uuid')
const { isLeadAppeal, canAppealBeLinked } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/appeals/:appealId/linked-appeals/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/linked-appeals/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/linked-appeals/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.session.data.addLinkedAppeal.reference)
    if(!canAppealBeLinked(appeal)) {
      res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/new/exit`)
    } else if(isLeadAppeal(req.params.appealId, req.session.data.linkedAppeals)) {
      res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/new/check`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/new/lead-appeal`)
    }
  })

  router.get('/main/appeals/:appealId/linked-appeals/new/lead-appeal', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let otherAppeal = req.session.data.appeals.find(appeal => appeal.id == req.session.data.addLinkedAppeal.reference)

    let radios = [{
      text: appeal.id,
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
      radios
    })
  })

  router.post('/main/appeals/:appealId/linked-appeals/new/lead-appeal', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/linked-appeals/new/check`)
  })

  router.get('/main/appeals/:appealId/linked-appeals/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/linked-appeals/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/linked-appeals/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let appealReference = req.session.data.addLinkedAppeal.reference
    let leadAppealReference = req.session.data.addLinkedAppeal.leadAppeal

    if(leadAppealReference) {
      // if you’re making the appeal reference that you typed in the lead
      // then the current appeal should be the child
      if(leadAppealReference == appealReference) {
        req.session.data.linkedAppeals.push({
          id: uuidv4(),
          leadAppealId: leadAppealReference,
          childAppealId: appeal.id
        })
      } else {
        // otherwise the reference is the child and the lead is the lead
        req.session.data.linkedAppeals.push({
          id: uuidv4(),
          leadAppealId: leadAppealReference,
          childAppealId: appealReference
        })
      }
    } else {
      req.session.data.linkedAppeals.push({
        id: uuidv4(),
        leadAppealId: appeal.id,
        childAppealId: appealReference
      })
    }

    delete req.session.data.addLinkedAppeal
    req.flash('success', 'Linked appeal added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

  router.get('/main/appeals/:appealId/linked-appeals/new/exit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/linked-appeals/new/exit', {
      appeal
    })
  })

}