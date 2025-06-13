const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/appeal-form/residential-units/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/residential-units/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/appeal-form/residential-units/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    // appeal.appealForm.residentialUnits
    req.flash('success', 'Number of residential units added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}