const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/remove-agent', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)


    res.render('/main/cases/remove-agent/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/remove-agent', function (req, res) {

    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.agent = null

    req.flash('success', 'Agent removed')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}