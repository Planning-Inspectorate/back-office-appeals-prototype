const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/add-agent', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    res.render('/main/cases/add-agent/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-agent', function (req, res) {

    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    agent = {}
    agent.organisationName = req.session.data.addAgent.organisationName
    agent.firstName = req.session.data.addAgent.firstName
    agent.lastName = req.session.data.addAgent.lastName
    agent.lastName = req.session.data.addAgent.lastName
    agent.emailAddress = req.session.data.addAgent.emailAddress
    agent.phone = req.session.data.addAgent.phone

    _case.agent = agent

    req.flash('success', 'Agent contact details added')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}