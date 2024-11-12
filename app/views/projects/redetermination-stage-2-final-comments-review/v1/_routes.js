const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// changing the appeal procedure
router.post('/review-final-comments', function (req, res) {
  if (req.session.data['review-outcome'] == 'Rejected') {
    res.redirect('why-rejected')
  } else if (req.session.data['review-outcome'] == 'Accepted with redaction') {
    res.redirect('redact-final-comments')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/check-your-answers', function (req, res) {
  if (req.session.data['review-outcome'] == 'Rejected') {
    req.flash('success', 'Appellant final comments accepted')
  } else if (req.session.data['review-outcome'] == 'Accepted with redaction') {
    req.flash('success', 'Appellant final comments redacted and accepted')
  } else {
    req.flash('success', 'Appellant final comments accepted')
  }
  res.redirect('case-details?appellant-fc-review-done=Yes')
})

router.post('/redact-final-comments', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/why-rejected', function (req, res) {
  res.redirect('check-your-answers')
})

// sharing final comments

router.post('/share-final-comments', function (req, res) {
  req.flash('success', 'Final comments shared')
  res.redirect('case-details?final-comments-shared=Yes&case-stage=redetermination')
})

// Add your routes above the module.exports line
module.exports = router
