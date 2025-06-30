const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/case-officer/edit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/case-officer/edit/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/case-officer/edit', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/case-officer/edit/check`)

  })

  router.get('/main/appeals/:appealId/case-officer/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/case-officer/edit/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/case-officer/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.caseOfficer = req.session.data.editCaseOfficer.caseOfficer
    delete req.session.data.editCaseOfficer
    req.flash('success', 'Assigned case officer updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}