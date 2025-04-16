const { getLinkedAppeals, isLeadAppeal, isChildAppeal } = require('../helpers/linked-appeals')
const _ = require('lodash')

const row = params => {
  let row = {}
  row.key = { html: params.key }
  row.value = { html: params.value }
  if(params.action) {
    row.actions = {
      items: [{
        href: params.action.href,
        text: params.action.text,
        visuallyHiddentText: params.action.text
      }]
    }
  }

  return row
}

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
    res.redirect(`/main/appeals/${req.params.appealId}/add-decision/appellant-costs-decision-letter`)
  })

  router.get('/main/appeals/:appealId/add-decision/appellant-costs-decision-letter', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-decision/appellant-costs-decision-letter', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-decision/appellant-costs-decision-letter', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-decision/lpa-costs-decision-letter`)
  })

  router.get('/main/appeals/:appealId/add-decision/lpa-costs-decision-letter', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-decision/lpa-costs-decision-letter', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-decision/lpa-costs-decision-letter', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-decision/check`)
  })


  router.get('/main/appeals/:appealId/add-decision/check', function (req, res) {
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


    res.render('/main/appeals/add-decision/check', {
      appeal,
      rows
    })
  })

  router.post('/main/appeals/:appealId/add-decision/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.status = 'Decision issued'
    if(appeal.isLeadAppeal) {

    } else {
      appeal.decision = req.session.data.issueDecision
    }
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