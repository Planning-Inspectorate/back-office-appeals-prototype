const _ = require('lodash')
const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/cases/:caseId/edit-inquiry', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let date = _.get(req, 'session.data.editInquiry.date') || DateTime.fromISO(_case.inquiry.date).toObject();
    let time = _.get(req, 'session.data.editInquiry.time')  || _case.inquiry.time

    res.render('/main/cases/edit-inquiry/index', {
      _case,
      date,
      time
    })
  })

  router.post('/main/cases/:caseId/edit-inquiry', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-inquiry/days`)
  })

  router.get('/main/cases/:caseId/edit-inquiry/days', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let hasDays = _.get(req, 'session.data.editInquiry.hasDays') || _case.inquiry.hasDays
    let days = _.get(req, 'session.data.editInquiry.days') || _case.inquiry.days

    res.render('/main/cases/edit-inquiry/days', {
      _case,
      hasDays,
      days
    })
  })

  router.post('/main/cases/:caseId/edit-inquiry/days', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-inquiry/has-address`)
  })

  router.get('/main/cases/:caseId/edit-inquiry/has-address', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let hasAddress = _.get(req, 'session.data.editInquiry.hasAddress') || _case.inquiry.hasAddress

    res.render('/main/cases/edit-inquiry/has-address', {
      _case,
      hasAddress
    })
  })

  router.post('/main/cases/:caseId/edit-inquiry/has-address', function (req, res) {
    if(req.session.data.editInquiry.hasAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.caseId}/edit-inquiry/address`)
    } else {
      res.redirect(`/main/cases/${req.params.caseId}/edit-inquiry/check`)
    }
  })

  router.get('/main/cases/:caseId/edit-inquiry/address', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let inquiryAddress = _.get(req, 'session.data.editInquiry.address') || _case.inquiry.address

    res.render('/main/cases/edit-inquiry/address', {
      _case,
      inquiryAddress
    })
  })

  router.post('/main/cases/:caseId/edit-inquiry/address', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-inquiry/check`)
  })

  router.get('/main/cases/:caseId/edit-inquiry/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    res.render('/main/cases/edit-inquiry/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-inquiry/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    _case.inquiry = req.session.data.editInquiry

    _case.inquiry.date = DateTime.fromObject({
      day: req.session.data.editInquiry.date.day,
      month: req.session.data.editInquiry.date.month,
      year: req.session.data.editInquiry.date.year
    }).toISO()

    req.flash('success', 'Inquiry updated')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}