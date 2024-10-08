const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// changing the appeal procedure
router.post('/change-procedure', function (req, res) {
  res.redirect('check-answers')
})

// changing the appeal procedure
router.post('/check-answers', function (req, res) {
  req.flash('success', 'Case procedure updated')
  res.redirect('case-details')
})

// Add your routes above the module.exports line
module.exports = router
