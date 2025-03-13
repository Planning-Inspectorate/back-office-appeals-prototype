const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/add-agent', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/add-agent/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-agent', function (req, res) {

    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    agent = {}
    agent.organisationName = req.session.data.addAgent.organisationName
    agent.firstName = req.session.data.addAgent.firstName
    agent.lastName = req.session.data.addAgent.lastName
    agent.lastName = req.session.data.addAgent.lastName
    agent.emailAddress = req.session.data.addAgent.emailAddress
    agent.phone = req.session.data.addAgent.phone

    appeal.agent = agent

    req.flash('success', 'Agent contact details added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}