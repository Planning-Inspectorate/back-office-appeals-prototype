const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/appeals/:caseId/add-inquiry', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/add-inquiry/index', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/add-inquiry', function (req, res) {
    res.redirect(`/main/appeals/${req.params.caseId}/add-inquiry/days`)
  })

  router.get('/main/appeals/:caseId/add-inquiry/days', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/add-inquiry/days', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/add-inquiry/days', function (req, res) {
    res.redirect(`/main/appeals/${req.params.caseId}/add-inquiry/has-address`)
  })

  router.get('/main/appeals/:caseId/add-inquiry/has-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/add-inquiry/has-address', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/add-inquiry/has-address', function (req, res) {
    if(req.session.data.addInquiry.hasAddress == 'Yes') {
      res.redirect(`/main/appeals/${req.params.caseId}/add-inquiry/address`)
    } else {
      res.redirect(`/main/appeals/${req.params.caseId}/add-inquiry/check`)
    }
  })

  router.get('/main/appeals/:caseId/add-inquiry/address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/add-inquiry/address', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/add-inquiry/address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.caseId}/add-inquiry/check`)
  })

  router.get('/main/appeals/:caseId/add-inquiry/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/add-inquiry/check', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/add-inquiry/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    appeal.inquiry = req.session.data.addInquiry

    appeal.inquiry.date = DateTime.fromObject({
      day: req.session.data.addInquiry.date.day,
      month: req.session.data.addInquiry.date.month,
      year: req.session.data.addInquiry.date.year
    }).toISO()

    // if the status is not this then it's ‘ready to start’ so leave the status as that
    if(appeal.status == 'Inquiry ready to set up') {
      appeal.status = 'Awaiting proof of evidence and witnesses'
    }

    delete req.session.data.addInquiry
    req.flash('success', 'Inquiry set up')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}