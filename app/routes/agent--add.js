const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/add-agent', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    res.render('/main/cases/add-agent/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-agent', function (req, res) {

    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    agent = {}
    agent.organisationName = req.session.data.addAgent.organisationName
    agent.firstName = req.session.data.addAgent.firstName
    agent.lastName = req.session.data.addAgent.lastName
    agent.lastName = req.session.data.addAgent.lastName
    agent.emailAddress = req.session.data.addAgent.emailAddress
    agent.phone = req.session.data.addAgent.phone

    application.agent = agent

    req.flash('success', 'Agent contact details added')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}