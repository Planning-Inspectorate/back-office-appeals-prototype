const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/edit-hearing', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let date
    if(_.get(req, 'session.data.editHearing.date')) {
      date = DateTime.fromObject({
        day: req.session.data.editHearing.date.day,
        month: req.session.data.editHearing.date.month,
        year: req.session.data.editHearing.date.year,
        hours: req.session.data.editHearing.date.hour,
        minutes: req.session.data.editHearing.date.minute
      }).toISO()
    } else {
      date = appeal.hearing.date
    }

    res.render('/main/appeals/edit-hearing/index', {
      appeal,
      date
    })
  })


  router.post('/main/appeals/:appealId/edit-hearing', function (req, res) {
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

    let date
    if(_.get(req, 'session.data.editHearing.date')) {
      date = DateTime.fromObject({
        day: req.session.data.editHearing.date.day,
        month: req.session.data.editHearing.date.month,
        year: req.session.data.editHearing.date.year,
        hours: req.session.data.editHearing.date.hour,
        minutes: req.session.data.editHearing.date.minute
      }).toISO()
    } else {
      date = appeal.hearing.date
    }
    
    res.render('/main/appeals/edit-hearing/check', {
      appeal,
      date
    })
  })

  router.post('/main/appeals/:appealId/edit-hearing/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    if(_.get(req, 'session.data.editHearing.date')) {
      appeal.hearing.date = DateTime.fromObject({
        day: req.session.data.editHearing.date.day,
        month: req.session.data.editHearing.date.month,
        year: req.session.data.editHearing.date.year,
        hours: req.session.data.editHearing.date.hour,
        minutes: req.session.data.editHearing.date.minute
      }).toISO()
    }

    if(_.get(req, 'session.data.editHearing.hasAddress')) {
      appeal.hearing.hasAddress = _.get(req, 'session.data.editHearing.hasAddress')
    }

    if(_.get(req, 'session.data.editHearing.address')) {
      appeal.hearing.hasAddress = 'Yes'
      appeal.hearing.address = _.get(req, 'session.data.editHearing.address')
    }

    if(appeal.hearing.hasAddress == 'Yes') {
      appeal.status = 'Awaiting hearing'
    }

    req.flash('success', 'Hearing updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })



}