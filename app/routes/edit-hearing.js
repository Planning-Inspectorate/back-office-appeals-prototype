const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/edit-hearing', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let date = _.get(req, 'session.data.editHearing.date') || DateTime.fromISO(appeal.hearing.date).toObject()
    let time

    if(_.get(req, 'session.data.editHearing.time.hour') || _.get(req, 'session.data.editHearing.time.minute')) {
      time = DateTime.now()
        .set({ 
          hour: parseInt(_.get(req, 'session.data.editHearing.time.hour'), 10), 
          minute: parseInt(_.get(req, 'session.data.editHearing.time.minute'), 10)
        })
        .set({ 
          hour: parseInt(_.get(req, 'session.data.editHearing.time.hour'), 10), 
          minute: parseInt(_.get(req, 'session.data.editHearing.time.minute'), 10)
        })
        .toISO();
    } else {
      time = appeal.hearing.date
    }
    
    res.render('/main/appeals/edit-hearing/index', {
      appeal,
      date,
      time
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

    let luxonDate = DateTime.fromISO(appeal.hearing.date)

    let date = _.get(req, 'session.data.editHearing.date') || {
      year: luxonDate.toFormat('yyyy'),
      month: luxonDate.toFormat('MM'),
      day: luxonDate.toFormat('dd')
    }
    let time

    if(_.get(req, 'session.data.editHearing.time.hour') || _.get(req, 'session.data.editHearing.time.minute')) {
      time = DateTime.now()
        .set({ 
          hour: parseInt(_.get(req, 'session.data.editHearing.time.hour'), 10), 
          minute: parseInt(_.get(req, 'session.data.editHearing.time.minute'), 10)
        })
        .set({ 
          hour: parseInt(_.get(req, 'session.data.editHearing.time.hour'), 10), 
          minute: parseInt(_.get(req, 'session.data.editHearing.time.minute'), 10)
        })
        .toISO();
    } else {
      time = appeal.hearing.date
    }

    res.render('/main/appeals/edit-hearing/check', {
      date,
      time,
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-hearing/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    // appeal.hearing = req.session.data.editHearing

    if(_.get(req, 'session.data.editHearing.date')) {
      appeal.hearing.date = DateTime.fromObject({
        day: req.session.data.editHearing.date.day,
        month: req.session.data.editHearing.date.month,
        year: req.session.data.editHearing.date.year,
        hours: req.session.data.editHearing.time.hour,
        minutes: req.session.data.editHearing.time.minute
      }).toISO()
    }

    if(_.get(req, 'session.data.editHearing.hasAddress')) {
      appeal.hearing.hasAddress = _.get(req, 'session.data.editHearing.hasAddress')
    }

    if(_.get(req, 'session.data.editHearing.address')) {
      appeal.hearing.address = _.get(req, 'session.data.editHearing.address')
    }

    req.flash('success', 'Hearing updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })



}