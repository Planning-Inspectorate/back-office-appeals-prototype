const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/edit-inquiry', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let date
    if(_.get(req, 'session.data.editInquiry.date')) {
      date = DateTime.fromObject({
        day: req.session.data.editInquiry.date.day,
        month: req.session.data.editInquiry.date.month,
        year: req.session.data.editInquiry.date.year,
        hours: req.session.data.editInquiry.date.hour,
        minutes: req.session.data.editInquiry.date.minute
      }).toISO()
    } else {
      date = appeal.inquiry.date
    }

    res.render('/main/appeals/edit-inquiry/index', {
      appeal,
      date
    })
  })

  router.post('/main/appeals/:appealId/edit-inquiry', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-inquiry/days`)
  })

  router.get('/main/appeals/:appealId/edit-inquiry/days', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let hasDays = _.get(req, 'session.data.editInquiry.hasDays') || appeal.inquiry.hasDays
    let days = _.get(req, 'session.data.editInquiry.days') || appeal.inquiry.days

    res.render('/main/appeals/edit-inquiry/days', {
      appeal,
      hasDays,
      days
    })
  })

  router.post('/main/appeals/:appealId/edit-inquiry/days', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-inquiry/has-address`)
  })

  router.get('/main/appeals/:appealId/edit-inquiry/has-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let hasAddress = _.get(req, 'session.data.editInquiry.hasAddress') || appeal.inquiry.hasAddress

    res.render('/main/appeals/edit-inquiry/has-address', {
      appeal,
      hasAddress
    })
  })

  router.post('/main/appeals/:appealId/edit-inquiry/has-address', function (req, res) {
    if(req.session.data.editInquiry.hasAddress == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-inquiry/address`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-inquiry/check`)
    }
  })

  router.get('/main/appeals/:appealId/edit-inquiry/address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let inquiryAddress = _.get(req, 'session.data.editInquiry.address') || appeal.inquiry.address

    res.render('/main/appeals/edit-inquiry/address', {
      appeal,
      inquiryAddress
    })
  })

  router.post('/main/appeals/:appealId/edit-inquiry/address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-inquiry/check`)
  })

  router.get('/main/appeals/:appealId/edit-inquiry/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let date
    if(_.get(req, 'session.data.editInquiry.date')) {
      date = DateTime.fromObject({
        day: req.session.data.editInquiry.date.day,
        month: req.session.data.editInquiry.date.month,
        year: req.session.data.editInquiry.date.year,
        hours: req.session.data.editInquiry.date.hour,
        minutes: req.session.data.editInquiry.date.minute
      }).toISO()
    } else {
      date = appeal.inquiry.date
    }

    let hasDays = _.get(req, 'session.data.editInquiry.hasDays') || appeal.inquiry.hasDays
    let days = _.get(req, 'session.data.editInquiry.days') || appeal.inquiry.days

    let hasAddress = _.get(req, 'session.data.editInquiry.hasAddress') || appeal.inquiry.hasAddress
    let address = _.get(req, 'session.data.editInquiry.address') || appeal.inquiry.address
    if(_.get(req, 'session.data.editInquiry.address')) {
      _.set(req, 'session.data.editInquiry.hasAddress', 'Yes')
    }

    let v = {
      appeal,
      date,
      hasDays,
      days,
      hasAddress,
      address
    }

    res.render('/main/appeals/edit-inquiry/check', {
      v
    })
  })

  router.post('/main/appeals/:appealId/edit-inquiry/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    if(_.get(req, 'session.data.editInquiry.date')) {
      appeal.inquiry.date = DateTime.fromObject({
        day: req.session.data.editInquiry.date.day,
        month: req.session.data.editInquiry.date.month,
        year: req.session.data.editInquiry.date.year,
        hours: req.session.data.editInquiry.date.hour,
        minutes: req.session.data.editInquiry.date.minute
      }).toISO()
    }

    if(_.get(req, 'session.data.editInquiry.hasDays')) {
      appeal.inquiry.hasDays = _.get(req, 'session.data.editInquiry.hasDays')
    }

    if(_.get(req, 'session.data.editInquiry.days')) {
      appeal.inquiry.hasDays = 'Yes'
      appeal.inquiry.days = _.get(req, 'session.data.editInquiry.days')
    }

    if(_.get(req, 'session.data.editInquiry.hasAddress')) {
      appeal.inquiry.hasAddress = _.get(req, 'session.data.editInquiry.hasAddress')
    }

    if(_.get(req, 'session.data.editInquiry.address')) {
      appeal.inquiry.hasAddress = 'Yes'
      appeal.inquiry.address = _.get(req, 'session.data.editInquiry.address')
    }

    if(appeal.inquiry.hasDays == 'Yes' && appeal.inquiry.hasAddress == 'Yes') {
      appeal.status = 'Awaiting proof of evidence and witnesses'
    }

    // reset mini session
    delete req.session.data.editInquiry

    req.flash('success', 'Inquiry updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}