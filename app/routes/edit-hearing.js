const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/cases/:caseId/edit-hearing', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    let date = _.get(req, 'session.data.editHearing.date') || DateTime.fromISO(_case.hearing.date)
    let time = _.get(req, 'session.data.editHearing.time')  || _case.hearing.time

    res.render('/main/cases/edit-hearing/index', {
      _case,
      date,
      time
    })
  })


  router.post('/main/cases/:caseId/edit-hearing', function (req, res) {
    req.session.data.editHearing.date = DateTime.fromObject({
      day: req.session.data.editHearing.date.day,
      month: req.session.data.editHearing.date.month,
      year: req.session.data.editHearing.date.year
    }).toISO()
    res.redirect(`/main/cases/${req.params.caseId}/edit-hearing/has-address`)
  })

  router.get('/main/cases/:caseId/edit-hearing/has-address', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    let hasAddress = _.get(req, 'session.data.editHearing.hasAddress') || _case.hearing.hasAddress

    res.render('/main/cases/edit-hearing/has-address', {
      _case,
      hasAddress
    })
  })

  router.post('/main/cases/:caseId/edit-hearing/has-address', function (req, res) {
    if(req.session.data.editHearing.hasAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.caseId}/edit-hearing/address`)
    } else {
      res.redirect(`/main/cases/${req.params.caseId}/edit-hearing/check`)
    }
  })

  router.get('/main/cases/:caseId/edit-hearing/address', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    let hearingAddress = _.get(req, 'session.data.editHearing.address') || _case.hearing.address

    res.render('/main/cases/edit-hearing/address', {
      _case,
      hearingAddress
    })
  })

  router.post('/main/cases/:caseId/edit-hearing/address', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-hearing/check`)
  })

  router.get('/main/cases/:caseId/edit-hearing/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    let date = _.get(req, 'session.data.editHearing.date') || DateTime.fromISO(_case.hearing.date)
    let time = _.get(req, 'session.data.editHearing.time')  || _case.hearing.time

    res.render('/main/cases/edit-hearing/check', {
      date,
      time,
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-hearing/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.hearing = req.session.data.editHearing

    req.flash('success', 'Hearing updated')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })



}