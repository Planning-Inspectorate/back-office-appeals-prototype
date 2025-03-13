const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/cases/:caseId/add-hearing', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-hearing/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-hearing', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-hearing/has-address`)
  })

  router.get('/main/cases/:caseId/add-hearing/has-address', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-hearing/has-address', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-hearing/has-address', function (req, res) {
    if(req.session.data.addHearing.hasAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.caseId}/add-hearing/address`)
    } else {
      res.redirect(`/main/cases/${req.params.caseId}/add-hearing/check`)
    }
  })

  router.get('/main/cases/:caseId/add-hearing/address', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-hearing/address', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-hearing/address', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-hearing/check`)
  })

  router.get('/main/cases/:caseId/add-hearing/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-hearing/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-hearing/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.hearing = req.session.data.addHearing

    _case.hearing.date = DateTime.fromObject({
      day: req.session.data.addHearing.date.day,
      month: req.session.data.addHearing.date.month,
      year: req.session.data.addHearing.date.year
    }).toISO()

    _case.status = 'Awaiting hearing'
    delete req.session.data.addHearing
    req.flash('success', 'Hearing set up')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}