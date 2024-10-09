const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// see if the IP gave us an address
router.post('/planning-obligation-review', function (req, res) {
  if (req.session.data['planning-obligation-review-decision'] == 'Valid') {
    res.redirect('check-your-answers')
  } else {
    res.redirect('why-invalid')
  }
})

// changing the appeal procedure
router.post('/why-invalid', function (req, res) {
  res.redirect('check-your-answers')
})

// changing the appeal procedure
router.post('/check-your-answers', function (req, res) {
  if (req.session.data['planning-obligation-review-decision'] == 'Valid') {
    // req.flash('success', 'Planning obligation valid')
    res.redirect('case-details?S106status=valid')
  } else {
    // req.flash('success', 'Planning obligation invalid')
    res.redirect('case-details?S106status=invalid')
  }
})

// Add your routes above the module.exports line
module.exports = router
