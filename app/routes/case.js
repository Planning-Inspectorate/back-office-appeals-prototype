// const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/show', {
      application
    })
  })

}