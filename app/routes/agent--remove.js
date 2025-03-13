const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:caseId/remove-agent', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)


    res.render('/main/appeals/remove-agent/index', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/remove-agent', function (req, res) {

    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    appeal.agent = null

    req.flash('success', 'Agent removed')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}