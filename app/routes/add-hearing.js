const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/add-hearing', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-hearing/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-hearing', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-hearing/has-address`)
  })

  router.get('/main/appeals/:appealId/add-hearing/has-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-hearing/has-address', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-hearing/has-address', function (req, res) {
    if(req.session.data.addHearing.hasAddress == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/add-hearing/address`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/add-hearing/check`)
    }
  })

  router.get('/main/appeals/:appealId/add-hearing/address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-hearing/address', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-hearing/address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-hearing/check`)
  })

  router.get('/main/appeals/:appealId/add-hearing/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-hearing/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-hearing/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.hearing = req.session.data.addHearing

    appeal.hearing.date = DateTime.fromObject({
      day: req.session.data.addHearing.date.day,
      month: req.session.data.addHearing.date.month,
      year: req.session.data.addHearing.date.year,
      hours: req.session.data.addHearing.time.hour,
      minutes: req.session.data.addHearing.time.minute,
    }).toISO()

    if(appeal.hearing.hasAddress == 'Yes') {
      appeal.status = 'Awaiting hearing'
    }
    delete req.session.data.addHearing
    req.flash('success', 'Hearing set up')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}