const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// changing the appeal procedure
router.post('/review-evidence', function (req, res) {
  if (req.session.data['review-outcome'] == 'Rejected') {
    res.redirect('why-rejected')
  } else if (req.session.data['review-outcome'] == 'Accepted with redaction') {
    res.redirect('redact-statement')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/check-your-answers', function (req, res) {
  req.flash('success', 'New evidence review complete')
  res.redirect('case-details?evidence-review-done=Yes')
})

router.post('/redact-statement', function (req, res) {
  res.redirect('check-redaction')
})

router.post('/check-redaction', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/why-rejected', function (req, res) {
  res.redirect('check-your-answers')
})

// sharing new evidence

router.post('/share-new-evidence', function (req, res) {
  res.redirect('request-final-comments')
})

router.post('/request-final-comments', function (req, res) {
  res.redirect('share-check-your-answers')
})

router.post('/share-check-your-answers', function (req, res) {
  req.flash('success', 'New evidence shared')
  res.redirect('case-details?new-evidence-shared=Yes')
})

// Add your routes above the module.exports line
module.exports = router
