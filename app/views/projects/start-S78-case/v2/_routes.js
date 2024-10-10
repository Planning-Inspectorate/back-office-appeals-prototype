const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/start-case', function (req, res) {
  if(req.session.data.appealProcedure != "Written representation") {
    res.redirect('transfer')
  } else {
    res.redirect('check')
  }
})

router.post('/start-case/check', function (req, res) {
  req.flash('success', 'Case started')
  req.session.data['case-stage'] = 'questionnaire'
  delete req.session.data.appealProcedure
  res.redirect('../case-details')
})

router.post('/start-case/transfer', function (req, res) {
  req.flash('success', 'Case marked as awaiting transfer')
  req.session.data['case-stage'] = 'awaitingTransfer'
  // delete req.session.data.appealProcedure
  res.redirect('../case-details')
})

router.post('/edit-horizon-reference', function (req, res) {
  res.redirect('/projects/start-s78-case/v2/edit-horizon-reference/check')
})

router.post('/edit-horizon-reference/check', function (req, res) {
  // req.flash('success', 'Horizon reference added')
  req.flash('success', 'Case marked as transferred')
  req.session.data['case-stage'] = 'transferred'
  res.redirect('../case-details')
})

// Add your routes above the module.exports line
module.exports = router
