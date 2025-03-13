const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/cases/:caseId/add-inquiry', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-inquiry/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-inquiry', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-inquiry/days`)
  })

  router.get('/main/cases/:caseId/add-inquiry/days', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-inquiry/days', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-inquiry/days', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-inquiry/has-address`)
  })

  router.get('/main/cases/:caseId/add-inquiry/has-address', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-inquiry/has-address', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-inquiry/has-address', function (req, res) {
    if(req.session.data.addInquiry.hasAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.caseId}/add-inquiry/address`)
    } else {
      res.redirect(`/main/cases/${req.params.caseId}/add-inquiry/check`)
    }
  })

  router.get('/main/cases/:caseId/add-inquiry/address', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-inquiry/address', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-inquiry/address', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-inquiry/check`)
  })

  router.get('/main/cases/:caseId/add-inquiry/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-inquiry/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-inquiry/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.inquiry = req.session.data.addInquiry

    _case.inquiry.date = DateTime.fromObject({
      day: req.session.data.addInquiry.date.day,
      month: req.session.data.addInquiry.date.month,
      year: req.session.data.addInquiry.date.year
    }).toISO()

    // if the status is not this then it's ‘ready to start’ so leave the status as that
    if(_case.status == 'Inquiry ready to set up') {
      _case.status = 'Awaiting proof of evidence and witnesses'
    }

    delete req.session.data.addInquiry
    req.flash('success', 'Inquiry set up')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}