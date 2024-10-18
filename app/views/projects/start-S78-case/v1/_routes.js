const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/start-case/check', function (req, res) {
  req.flash('success', 'Case started')
  req.session.data['case-stage'] = 'questionnaire'
  res.redirect('../case-details')
})

router.post('/add-hearing-details', function (req, res) {
  res.redirect('./add-hearing-details/check')
})

// router.post('/add-hearing-details/check', function (req, res) {
//   req.flash('success', 'Hearing details added')
//   res.redirect('../case-details')
// })

// Add your routes above the module.exports line
module.exports = router
