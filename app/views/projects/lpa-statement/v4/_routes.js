const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// changing the appeal procedure
router.post('/statement-review', function (req, res) {
  if (req.session.data['review-outcome'] == 'Reject statement') {
    res.redirect('reject-statement')
  } else if (req.session.data['review-outcome'] == 'Statement incomplete') {
    res.redirect('why-incomplete')
  } else if (req.session.data['review-outcome'] == 'Redact and accept statement') {
    res.redirect('redact-statement')
  } else {
    res.redirect('check-allocation-update')
  }
})

router.post('/redact-statement', function (req, res) {
  res.redirect('check-allocation-update')
})


router.post('/matrix-update', function (req, res) {
  if (req.session.data['matrix-update'] == 'No') {
    res.redirect('check-your-answers')
  } else {
    res.redirect('select-allocation')
  }
})

router.post('/select-allocation', function (req, res) {
  res.redirect('select-specialism')
})

router.post('/select-specialism', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/redact-statement', function (req, res) {
  res.redirect('check-allocation-update')
})

router.post('/check-allocation-update', function (req, res) {
  if (req.session.data['matrix-update'] == 'Yes') {
    res.redirect('select-allocation')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/select-allocation', function (req, res) {
  res.redirect('select-specialism')
})

router.post('/select-specialism', function (req, res) {
  res.redirect('allow-resubmission')
})

router.post('/why-incomplete', function (req, res) {
  res.redirect('allow-resubmission')
})

router.post('/reject-statement', function (req, res) {
  res.redirect('allow-resubmission')
})

router.post('/allow-resubmission', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/check-your-answers', function (req, res) {
  if (req.session.data['review-outcome'] == 'Redact and accept statement') {
    req.flash('success', 'Statement redacted and accepted')
    res.redirect('case-details?statement-review-done=Yes')
  } else if (req.session.data['review-outcome'] == 'Statement incomplete') {
    req.flash('success', 'Statement incomplete')
    res.redirect('case-details?statement-review-done=Yes')
  } else if (req.session.data['review-outcome'] == 'Reject statement') {
    req.flash('success', 'Statement rejected')
    res.redirect('case-details?statement-review-done=Yes')
  } else {
    req.flash('success', 'Statement accepted')
    res.redirect('case-details?statement-review-done=Yes')
  }
})

// changing the appeal procedure
router.post('/name-change', function (req, res) {
  req.flash('success', 'File name updated')
  res.redirect('manage-document')
})

// Add your routes above the module.exports line
module.exports = router
