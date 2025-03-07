const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/cases/:caseId/linked-appeals/new', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/linked-appeals/new/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/linked-appeals/new', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/linked-appeals/new/relationship`)
  })

  router.get('/main/cases/:caseId/linked-appeals/new/relationship', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/linked-appeals/new/relationship', {
      _case
    })
  })

  router.post('/main/cases/:caseId/linked-appeals/new/relationship', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/linked-appeals/new/check`)
  })

  router.get('/main/cases/:caseId/linked-appeals/new/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/linked-appeals/new/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/linked-appeals/new/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    _case.linkedAppeals.push({
      id: req.session.data.addLinkedAppeal.id,
      relationship: req.session.data.addLinkedAppeal.relationship
    })

    // get the other case and do the opposite so they are linked in both directions
    // TODO

    delete req.session.data.addLinkedAppeal
    req.flash('success', 'Appeal linked')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}