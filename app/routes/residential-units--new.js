const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/residential-units/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/residential-units/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/residential-units/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    // Save details
    appeal.appealForm.residentialUnits = req.session.data.appealForm.residentialUnits

    if(appeal.appealForm.residentialUnits == 'Net gain') {
      appeal.appealForm.netGain = req.session.data.appealForm.netGain
    }

    if(appeal.appealForm.residentialUnits == 'Net loss') {
      appeal.appealForm.netLoss = req.session.data.appealForm.netLoss
    }

    delete req.session.data.appealForm
    req.flash('success', 'Number of residential units added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}