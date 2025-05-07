const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/site-visit/edit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let date
    if(_.get(req, 'session.data.editSiteVisit.date')) {
      date = DateTime.fromObject({
        day: req.session.data.editSiteVisit.date.day,
        month: req.session.data.editSiteVisit.date.month,
        year: req.session.data.editSiteVisit.date.year,
        hours: req.session.data.editSiteVisit.date.hour,
        minutes: req.session.data.editSiteVisit.date.minute
      }).toISO()
    } else {
      date = appeal.siteVisit.date
    }

    res.render('/main/appeals/site-visit/edit/index', {
      appeal,
      date
    })
  })


  router.post('/main/appeals/:appealId/site-visit/edit', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/site-visit/edit/type`)
  })

  router.get('/main/appeals/:appealId/site-visit/edit/type', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let type = _.get(req, 'session.data.editSiteVisit.type') || appeal.siteVisit.type

    res.render('/main/appeals/site-visit/edit/type', {
      appeal,
      type
    })
  })

  router.post('/main/appeals/:appealId/site-visit/edit/type', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/site-visit/edit/check`)
  })


  router.get('/main/appeals/:appealId/site-visit/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let date
    if(_.get(req, 'session.data.editSiteVisit.date')) {
      date = DateTime.fromObject({
        day: req.session.data.editSiteVisit.date.day,
        month: req.session.data.editSiteVisit.date.month,
        year: req.session.data.editSiteVisit.date.year,
        hours: req.session.data.editSiteVisit.date.hour,
        minutes: req.session.data.editSiteVisit.date.minute
      }).toISO()
    } else {
      date = appeal.siteVisit.date
    }

    let type = req.session.data.editSiteVisit.type || appeal.siteVisit.type
    
    res.render('/main/appeals/site-visit/edit/check', {
      appeal,
      date,
      type
    })
  })

  router.post('/main/appeals/:appealId/site-visit/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    if(_.get(req, 'session.data.editSiteVisit.date')) {
      appeal.siteVisit.date = DateTime.fromObject({
        day: req.session.data.editSiteVisit.date.day,
        month: req.session.data.editSiteVisit.date.month,
        year: req.session.data.editSiteVisit.date.year,
        hours: req.session.data.editSiteVisit.date.hour,
        minutes: req.session.data.editSiteVisit.date.minute
      }).toISO()
    }

    if(_.get(req, 'session.data.editSiteVisit.type')) {
      appeal.siteVisit.type = _.get(req, 'session.data.editSiteVisit.type')
    }

    if(appeal.status == 'Site visit ready to set up') {
      appeal.status = 'Awaiting site visit'
    }

    req.flash('success', 'Site visit updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })



}