const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/edit-hearing', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let date = _.get(req, 'session.data.editHearing.date') || application.hearing.date
    let time = _.get(req, 'session.data.editHearing.time')  || application.hearing.time

    res.render('/main/cases/edit-hearing/index', {
      application,
      date,
      time
    })
  })


  router.post('/main/cases/:appealId/edit-hearing', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/edit-hearing/has-address`)
  })

  router.get('/main/cases/:appealId/edit-hearing/has-address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let hasAddress = _.get(req, 'session.data.editHearing.hasAddress') || application.hearing.hasAddress

    res.render('/main/cases/edit-hearing/has-address', {
      application,
      hasAddress
    })
  })

  router.post('/main/cases/:appealId/edit-hearing/has-address', function (req, res) {
    if(req.session.data.editHearing.hasAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.appealId}/edit-hearing/address`)
    } else {
      res.redirect(`/main/cases/${req.params.appealId}/edit-hearing/check`)
    }
  })

  router.get('/main/cases/:appealId/edit-hearing/address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let hearingAddress = _.get(req, 'session.data.editHearing.address') || application.hearing.address

    res.render('/main/cases/edit-hearing/address', {
      application,
      hearingAddress
    })
  })

  router.post('/main/cases/:appealId/edit-hearing/address', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/edit-hearing/check`)
  })

  router.get('/main/cases/:appealId/edit-hearing/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    res.render('/main/cases/edit-hearing/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-hearing/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.hearing = req.session.data.editHearing
    req.flash('success', 'Hearing updated')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })



}