const { getLinkedAppeals, isLeadAppeal, isChildAppeal } = require('../helpers/linked-appeals')
const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/decision/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/decision/new/index', {
      appeal,
      appealId: appeal.id
    })
  })

  router.post('/main/appeals/:appealId/decision/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    
    if(appeal.isLeadAppeal) {
      let firstChildAppealId = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)[0].id
      res.redirect(`/main/appeals/${req.params.appealId}/decision/new/${firstChildAppealId}`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/decision/new/decision-letter`)
    }
  })

  router.get('/main/appeals/:appealId/decision/new/decision-letter', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/decision/new/decision-letter', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/decision/new/decision-letter', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/decision/new/has-appellant-costs-decision`)
  })

  router.get('/main/appeals/:appealId/decision/new/has-appellant-costs-decision', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/decision/new/has-appellant-costs-decision', {
      appeal
    })
  })


  router.post('/main/appeals/:appealId/decision/new/has-appellant-costs-decision', function (req, res) {
    if(req.session.data.issueDecision.hasAppellantCostsDecision == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/decision/new/appellant-costs-decision-letter`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/decision/new/has-lpa-costs-decision`)
    }
  })


  router.get('/main/appeals/:appealId/decision/new/appellant-costs-decision-letter', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/decision/new/appellant-costs-decision-letter', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/decision/new/appellant-costs-decision-letter', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/decision/new/has-lpa-costs-decision`)
  })

  router.get('/main/appeals/:appealId/decision/new/has-lpa-costs-decision', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/decision/new/has-lpa-costs-decision', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/decision/new/has-lpa-costs-decision', function (req, res) {
    if(req.session.data.issueDecision.hasLPACostsDecision == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/decision/new/lpa-costs-decision-letter`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/decision/new/check`)
    }
  })

  router.get('/main/appeals/:appealId/decision/new/lpa-costs-decision-letter', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/decision/new/lpa-costs-decision-letter', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/decision/new/lpa-costs-decision-letter', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/decision/new/check`)
  })


  router.get('/main/appeals/:appealId/decision/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    if(appeal.isLeadAppeal) {
      var rows = _.map(req.session.data.issueDecision.decision, (value, key) => {
        let linkedAppeal = req.session.data.appeals.find(appeal => appeal.id == key)
        linkedAppeal.isLeadAppeal = isLeadAppeal(linkedAppeal.id, req.session.data.linkedAppeals)
  	    linkedAppeal.isChildAppeal = isChildAppeal(linkedAppeal.id, req.session.data.linkedAppeals)	

        var rowKey
        var rowValue = {
          html: value
        }
        var rowActions
        if(linkedAppeal.isLeadAppeal) {
          rowKey = {
            text: `Decision for lead appeal ${linkedAppeal.id}`
          } 
          rowActions = {
            items: [{
              href: `/main/appeals/${appeal.id}/add-decision`,
              text: 'Change',
              visuallyHiddenText: `Decision for lead appeal ${appeal.id}`
            }]
          }
        } else {
          rowKey = {
            text: `Decision for child appeal ${linkedAppeal.id}`
          }
          rowActions = {
            items: [{
              href: `/main/appeals/${appeal.id}/add-decision/${key}`,
              text: 'Change',
              visuallyHiddenText: `Decision for child appeal ${linkedAppeal.id}`
            }]
          }
        }

        return {
          key: rowKey,
          value: rowValue,
          actions: rowActions
        }
      })

      rows.push({
        key: {
          text: "Decision letter"
        },
        value: {
          html: '<a href="#">decision-letter.pdf</a>'
        },
        actions: {
          items: [
            {
              href: `/main/appeals/${appeal.id}/decision-letter`,
              text: "Change",
              visuallyHiddenText: "decision letter"
            }
          ]
        }
      })


      rows.push({
        key: {
          text: "Appellant costs decision letter"
        },
        value: {
          html: '<a href="#">appellant-costs-decision-letter.pdf</a>'
        },
        actions: {
          items: [
            {
              href: `/main/appeals/${appeal.id}/appellant-costs-decision-letter`,
              text: "Change",
              visuallyHiddenText: "Appellant costs decision letter"
            }
          ]
        }
      })

      rows.push({
        key: {
          text: "LPA costs decision letter"
        },
        value: {
          html: '<a href="#">lpa-costs-decision-letter.pdf</a>'
        },
        actions: {
          items: [
            {
              href: `/main/appeals/${appeal.id}/lpa-costs-decision-letter`,
              text: "Change",
              visuallyHiddenText: "LPA costs decision letter"
            }
          ]
        }
      })
    }


    res.render('/main/appeals/decision/new/check', {
      appeal,
      rows
    })
  })

  router.post('/main/appeals/:appealId/decision/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.status = 'Decision issued'
    if(appeal.isLeadAppeal) {

    } else {
      appeal.decision = req.session.data.issueDecision
      appeal.decision.issueDate = new Date()
      if(req.session.data.issueDecision.hasAppellantCostsDecision == 'Yes') {
        appeal.decision.appellantCostsDecision = {
          name: 'appellant-cost-decision.pdf',
          size: '10MB'
        }
      }
      if(req.session.data.issueDecision.hasLPACostsDecision == 'Yes') {
        appeal.decision.lpaCostsDecision = {
          name: 'lpa-cost-decision.pdf',
          size: '10MB'
        }
      }
    }

    delete req.session.data.issueDecision
    req.flash('success', 'Decision issued')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

  router.get('/main/appeals/:appealId/decision/new/:childAppealId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/decision/new/child-decision', {
      appeal,
      appealId: req.params.childAppealId
    })
  })

  router.post('/main/appeals/:appealId/decision/new/:childAppealId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let linkedAppeals = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)
    var childAppealIndex = _.findIndex(linkedAppeals, {id: req.params.childAppealId})
    let nextChildAppeal = _.get(linkedAppeals, childAppealIndex + 1)

    if(nextChildAppeal) {
      res.redirect(`/main/appeals/${req.params.appealId}/decision/new/${nextChildAppeal.id}`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/decision/new/decision-letter`)
    }
  })

}