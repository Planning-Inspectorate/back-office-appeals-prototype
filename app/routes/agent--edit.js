const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/edit-agent', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let agent = application.agent
    let firstName = _.get(req, 'session.data.editAgent.firstName') || _.get(agent, 'firstName')
    let lastName = _.get(req, 'session.data.editAgent.lastName')  || _.get(agent, 'lastName')
    let organisationName = _.get(req, 'session.data.editAgent.organisationName')  || _.get(agent, 'organisationName')
    let emailAddress = _.get(req, 'session.data.editAgent.emailAddress')  || _.get(agent, 'emailAddress')
    let phone = _.get(req, 'session.data.editAgent.phone')  || _.get(agent, 'phone')

    res.render('/main/cases/edit-agent/index', {
      application,
      firstName,
      lastName,
      organisationName,
      emailAddress,
      phone
    })
  })

  router.post('/main/cases/:appealId/edit-agent', function (req, res) {

    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let agent = application.agent
    agent.organisationName = req.session.data.editAgent.organisationName
    agent.firstName = req.session.data.editAgent.firstName
    agent.lastName = req.session.data.editAgent.lastName
    agent.lastName = req.session.data.editAgent.lastName
    agent.emailAddress = req.session.data.editAgent.emailAddress
    agent.phone = req.session.data.editAgent.phone

    // Clear temporary form data
    delete req.session.data.editAgent

    req.flash('success', 'Agent contact details changed')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}