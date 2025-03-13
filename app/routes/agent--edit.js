const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/edit-agent', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let agent = appeal.agent
    let firstName = _.get(req, 'session.data.editAgent.firstName') || _.get(agent, 'firstName')
    let lastName = _.get(req, 'session.data.editAgent.lastName')  || _.get(agent, 'lastName')
    let organisationName = _.get(req, 'session.data.editAgent.organisationName')  || _.get(agent, 'organisationName')
    let emailAddress = _.get(req, 'session.data.editAgent.emailAddress')  || _.get(agent, 'emailAddress')
    let phone = _.get(req, 'session.data.editAgent.phone')  || _.get(agent, 'phone')

    res.render('/main/appeals/edit-agent/index', {
      appeal,
      firstName,
      lastName,
      organisationName,
      emailAddress,
      phone
    })
  })

  router.post('/main/appeals/:appealId/edit-agent', function (req, res) {

    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let agent = appeal.agent
    agent.organisationName = req.session.data.editAgent.organisationName
    agent.firstName = req.session.data.editAgent.firstName
    agent.lastName = req.session.data.editAgent.lastName
    agent.lastName = req.session.data.editAgent.lastName
    agent.emailAddress = req.session.data.editAgent.emailAddress
    agent.phone = req.session.data.editAgent.phone

    // Clear temporary form data
    delete req.session.data.editAgent

    req.flash('success', 'Agent contact details updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}