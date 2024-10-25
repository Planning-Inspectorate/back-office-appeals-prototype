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

// uploading a new planning obligation
router.post('/upload-document-date', function (req, res) {
  res.redirect('upload-document-check-your-answers')
})

router.post('/upload-document-check-your-answers', function (req, res) {
  req.flash('success', 'Document added')
  res.redirect('obligation-review-documents')
})

// changing the appeal procedure
router.post('/why-invalid', function (req, res) {
  res.redirect('check-your-answers')
})

// changing the appeal procedure
router.post('/check-your-answers', function (req, res) {
  if (req.session.data['planning-obligation-review-decision'] == 'Valid') {
    req.flash('success', 'Planning obligation accepted')
    res.redirect('case-details?S106status=')
  } else {
    req.flash('success', 'Planning obligation rejected')
    res.redirect('case-details?S106status=')
  }
})

// changing the appeal procedure
router.post('/name-change', function (req, res) {
  req.flash('success', 'File name updated')
  res.redirect('manage-document')
})

// Add your routes above the module.exports line
module.exports = router
