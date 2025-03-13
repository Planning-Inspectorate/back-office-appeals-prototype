const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:caseId/edit-inquiry', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)

    let date = _.get(req, 'session.data.editInquiry.date') || DateTime.fromISO(appeal.inquiry.date).toObject();
    let time = _.get(req, 'session.data.editInquiry.time')  || appeal.inquiry.time

    res.render('/main/appeals/edit-inquiry/index', {
      appeal,
      date,
      time
    })
  })

  router.post('/main/appeals/:caseId/edit-inquiry', function (req, res) {
    res.redirect(`/main/appeals/${req.params.caseId}/edit-inquiry/days`)
  })

  router.get('/main/appeals/:caseId/edit-inquiry/days', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)

    let hasDays = _.get(req, 'session.data.editInquiry.hasDays') || appeal.inquiry.hasDays
    let days = _.get(req, 'session.data.editInquiry.days') || appeal.inquiry.days

    res.render('/main/appeals/edit-inquiry/days', {
      appeal,
      hasDays,
      days
    })
  })

  router.post('/main/appeals/:caseId/edit-inquiry/days', function (req, res) {
    res.redirect(`/main/appeals/${req.params.caseId}/edit-inquiry/has-address`)
  })

  router.get('/main/appeals/:caseId/edit-inquiry/has-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)

    let hasAddress = _.get(req, 'session.data.editInquiry.hasAddress') || appeal.inquiry.hasAddress

    res.render('/main/appeals/edit-inquiry/has-address', {
      appeal,
      hasAddress
    })
  })

  router.post('/main/appeals/:caseId/edit-inquiry/has-address', function (req, res) {
    if(req.session.data.editInquiry.hasAddress == 'Yes') {
      res.redirect(`/main/appeals/${req.params.caseId}/edit-inquiry/address`)
    } else {
      res.redirect(`/main/appeals/${req.params.caseId}/edit-inquiry/check`)
    }
  })

  router.get('/main/appeals/:caseId/edit-inquiry/address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)

    let inquiryAddress = _.get(req, 'session.data.editInquiry.address') || appeal.inquiry.address

    res.render('/main/appeals/edit-inquiry/address', {
      appeal,
      inquiryAddress
    })
  })

  router.post('/main/appeals/:caseId/edit-inquiry/address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.caseId}/edit-inquiry/check`)
  })

  router.get('/main/appeals/:caseId/edit-inquiry/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)

    res.render('/main/appeals/edit-inquiry/check', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/edit-inquiry/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    appeal.inquiry = req.session.data.editInquiry

    appeal.inquiry.date = DateTime.fromObject({
      day: req.session.data.editInquiry.date.day,
      month: req.session.data.editInquiry.date.month,
      year: req.session.data.editInquiry.date.year
    }).toISO()

    req.flash('success', 'Inquiry updated')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}