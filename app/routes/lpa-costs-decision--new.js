const { getLinkedAppeals, isLeadAppeal, isChildAppeal } = require('../helpers/linked-appeals')
const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/lpa-costs-decision/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/lpa-costs-decision/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/lpa-costs-decision/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/lpa-costs-decision/new/check`)
  })

  router.get('/main/appeals/:appealId/lpa-costs-decision/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/lpa-costs-decision/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/lpa-costs-decision/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.lpaCostsDecision = {
      letter: {
        name: 'lpa-cost-decision.pdf',
        size: '10MB'
      },
      issueDate: new Date()
    }

    delete req.session.data.lpaCostsDecision
    req.flash('success', 'LPA costs decision issued')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}