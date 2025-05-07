const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/site-visit/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/site-visit/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/site-visit/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/site-visit/new/type`)
  })

  router.get('/main/appeals/:appealId/site-visit/new/type', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/site-visit/new/type', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/site-visit/new/type', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/site-visit/new/check`)
  })

  router.get('/main/appeals/:appealId/site-visit/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/site-visit/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/site-visit/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.siteVisit = req.session.data.addSiteVisit

    appeal.siteVisit.date = DateTime.fromObject({
      day: appeal.siteVisit.date.day,
      month: appeal.siteVisit.date.month,
      year: appeal.siteVisit.date.year,
      hours: appeal.siteVisit.time.hour,
      minutes: appeal.siteVisit.time.minute,
    }).toISO()

    delete req.session.data.addSiteVisit
    req.flash('success', 'Site visit set up')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}