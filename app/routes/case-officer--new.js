const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/case-officer/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/case-officer/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/case-officer/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/case-officer/new/check`)

  })

  router.get('/main/appeals/:appealId/case-officer/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/case-officer/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/case-officer/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.caseOfficer = req.session.data.addCaseOfficer.caseOfficer
    delete req.session.data.addCaseOfficer
    req.flash('success', 'Case officer assigned')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}