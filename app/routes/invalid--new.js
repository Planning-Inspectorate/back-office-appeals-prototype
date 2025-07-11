const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/invalid/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/invalid/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/invalid/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/invalid/new/check`)
  })

  router.get('/main/appeals/:appealId/invalid/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/invalid/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/invalid/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    appeal.status = 'Invalid'
    appeal.invalid = {
      invalidDate: new Date(),
      reason: req.session.data.markAsInvalid.reason
    }

    req.flash('success', 'Appeal marked as invalid')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}

