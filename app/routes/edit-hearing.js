const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/edit-hearing', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let date = _.get(req, 'session.data.editHearing.date') || DateTime.fromISO(appeal.hearing.date)
    let time = _.get(req, 'session.data.editHearing.time')  || appeal.hearing.time

    res.render('/main/appeals/edit-hearing/index', {
      appeal,
      date,
      time
    })
  })


  router.post('/main/appeals/:appealId/edit-hearing', function (req, res) {
    req.session.data.editHearing.date = DateTime.fromObject({
      day: req.session.data.editHearing.date.day,
      month: req.session.data.editHearing.date.month,
      year: req.session.data.editHearing.date.year
    }).toISO()
    res.redirect(`/main/appeals/${req.params.appealId}/edit-hearing/has-address`)
  })

  router.get('/main/appeals/:appealId/edit-hearing/has-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let hasAddress = _.get(req, 'session.data.editHearing.hasAddress') || appeal.hearing.hasAddress

    res.render('/main/appeals/edit-hearing/has-address', {
      appeal,
      hasAddress
    })
  })

  router.post('/main/appeals/:appealId/edit-hearing/has-address', function (req, res) {
    if(req.session.data.editHearing.hasAddress == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-hearing/address`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-hearing/check`)
    }
  })

  router.get('/main/appeals/:appealId/edit-hearing/address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let hearingAddress = _.get(req, 'session.data.editHearing.address') || appeal.hearing.address

    res.render('/main/appeals/edit-hearing/address', {
      appeal,
      hearingAddress
    })
  })

  router.post('/main/appeals/:appealId/edit-hearing/address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-hearing/check`)
  })

  router.get('/main/appeals/:appealId/edit-hearing/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let date = _.get(req, 'session.data.editHearing.date') || DateTime.fromISO(appeal.hearing.date)
    let time = _.get(req, 'session.data.editHearing.time')  || appeal.hearing.time

    res.render('/main/appeals/edit-hearing/check', {
      date,
      time,
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-hearing/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.hearing = req.session.data.editHearing

    req.flash('success', 'Hearing updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })



}