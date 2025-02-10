const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/cases/:appealId/add-inquiry', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-inquiry/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-inquiry', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-inquiry/days`)
  })

  router.get('/main/cases/:appealId/add-inquiry/days', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-inquiry/days', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-inquiry/days', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-inquiry/has-address`)
  })

  router.get('/main/cases/:appealId/add-inquiry/has-address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-inquiry/has-address', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-inquiry/has-address', function (req, res) {
    if(req.session.data.addInquiry.hasAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.appealId}/add-inquiry/address`)
    } else {
      res.redirect(`/main/cases/${req.params.appealId}/add-inquiry/check`)
    }
  })

  router.get('/main/cases/:appealId/add-inquiry/address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-inquiry/address', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-inquiry/address', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-inquiry/check`)
  })

  router.get('/main/cases/:appealId/add-inquiry/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-inquiry/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-inquiry/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.inquiry = req.session.data.addInquiry

    application.inquiry.date = DateTime.fromObject({
      day: req.session.data.addInquiry.date.day,
      month: req.session.data.addInquiry.date.month,
      year: req.session.data.addInquiry.date.year
    }).toISO()

    // if the status is not this then it's ‘ready to start’ so leave the status as that
    if(application.status == 'Inquiry ready to set up') {
      application.status = 'Awaiting proof of evidence and witnesses'
    }

    delete req.session.data.addInquiry
    req.flash('success', 'Inquiry set up')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}