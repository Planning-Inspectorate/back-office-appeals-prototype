const _ = require('lodash')
const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/cases/:appealId/edit-inquiry', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let date = _.get(req, 'session.data.editInquiry.date') || DateTime.fromISO(application.inquiry.date).toObject();
    let time = _.get(req, 'session.data.editInquiry.time')  || application.inquiry.time

    res.render('/main/cases/edit-inquiry/index', {
      application,
      date,
      time
    })
  })

  router.post('/main/cases/:appealId/edit-inquiry', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/edit-inquiry/days`)
  })

  router.get('/main/cases/:appealId/edit-inquiry/days', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let hasDays = _.get(req, 'session.data.editInquiry.hasDays') || application.inquiry.hasDays
    let days = _.get(req, 'session.data.editInquiry.days') || application.inquiry.days

    res.render('/main/cases/edit-inquiry/days', {
      application,
      hasDays,
      days
    })
  })

  router.post('/main/cases/:appealId/edit-inquiry/days', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/edit-inquiry/has-address`)
  })

  router.get('/main/cases/:appealId/edit-inquiry/has-address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let hasAddress = _.get(req, 'session.data.editInquiry.hasAddress') || application.inquiry.hasAddress

    res.render('/main/cases/edit-inquiry/has-address', {
      application,
      hasAddress
    })
  })

  router.post('/main/cases/:appealId/edit-inquiry/has-address', function (req, res) {
    if(req.session.data.editInquiry.hasAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.appealId}/edit-inquiry/address`)
    } else {
      res.redirect(`/main/cases/${req.params.appealId}/edit-inquiry/check`)
    }
  })

  router.get('/main/cases/:appealId/edit-inquiry/address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let inquiryAddress = _.get(req, 'session.data.editInquiry.address') || application.inquiry.address

    res.render('/main/cases/edit-inquiry/address', {
      application,
      inquiryAddress
    })
  })

  router.post('/main/cases/:appealId/edit-inquiry/address', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/edit-inquiry/check`)
  })

  router.get('/main/cases/:appealId/edit-inquiry/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    res.render('/main/cases/edit-inquiry/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-inquiry/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.inquiry = req.session.data.editInquiry

    application.inquiry.date = DateTime.fromObject({
      day: req.session.data.editInquiry.date.day,
      month: req.session.data.editInquiry.date.month,
      year: req.session.data.editInquiry.date.year
    }).toISO()

    req.flash('success', 'Inquiry updated')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}