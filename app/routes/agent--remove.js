const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/remove-agent', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)


    res.render('/main/cases/remove-agent/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/remove-agent', function (req, res) {

    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    _case.agent = null

    req.flash('success', 'Agent removed')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}