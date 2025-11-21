const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'
  next()
})

// see if the IP gave us an address
router.post('/document-review', function (req, res) {
  if (req.session.data['document-review-decision'] == 'Reject proof of evidence and witnesses') {
    res.redirect('reject-documents')
  } else {
    res.redirect('check-your-answers')
  }
})

// uploading a new planning obligation
router.post('/upload-document', function (req, res) {
  res.redirect('upload-document-details')
})

router.post('/upload-document-details', function (req, res) {
  res.redirect('upload-document-date')
})

// uploading a new planning obligation
router.post('/upload-document-date', function (req, res) {
  res.redirect('upload-document-check-your-answers')
})

router.post('/upload-document-check-your-answers', function (req, res) {
  req.flash('success', 'Proof of evidence and witnesses document added')
  res.redirect('documents')
})

// changing the appeal procedure
router.post('/reject-documents', function (req, res) {
  res.redirect('check-your-answers')
})

// changing the appeal procedure
router.post('/check-your-answers', function (req, res) {
  if (req.session.data['document-review-decision'] == 'Accept proof of evidence and witnesses') {
    req.flash('success', 'Proof of evidence and witnesses accepted')
    res.redirect('case-details?documentReview=completed')
  } else {
    req.flash('success', 'Proof of evidence and witnesses rejected')
    res.redirect('case-details?documentReview=completed')
  }
})

// changing the appeal procedure
router.post('/name-change', function (req, res) {
  req.flash('success', 'File name updated')
  res.redirect('manage-document')
})

// Add your routes above the module.exports line
module.exports = router
