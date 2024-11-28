const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

router.post('/statement-review', function (req, res) {
  if (req.session.data['review-outcome'] == 'Redact and accept statement') {
    res.redirect('statement-redact')
  } else if (req.session.data['review-outcome'] == 'Reject statement') {
    res.redirect('why-rejected')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/statement-redact', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/why-rejected', function (req, res) {
  res.redirect('allow-resubmission')
})

router.post('/allow-resubmission', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/check-your-answers', function (req, res) {
  if (req.session.data['review-outcome'] == 'Reject statement') {
    req.flash('success', 'Statement rejected')
    res.redirect('rule-6-statements?statement-reviewed=yes')
  } else if (req.session.data['review-outcome'] == 'Redact and accept statement') {
    req.flash('success', 'Statement redacted and accepted')
    res.redirect('rule-6-statements?statement-reviewed=yes')
  } else {
    req.flash('success', 'Statement accepted')
    res.redirect('rule-6-statements?statement-reviewed=yes')
  }
})

// Add your routes above the module.exports line
module.exports = router
