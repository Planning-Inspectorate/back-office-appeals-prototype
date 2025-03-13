const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/remove-agent', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)


    res.render('/main/appeals/remove-agent/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/remove-agent', function (req, res) {

    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.agent = null

    req.flash('success', 'Agent removed')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}