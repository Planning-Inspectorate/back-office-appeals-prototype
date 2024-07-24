const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// adding a manual comment

router.post('/add-ip-name-and-email', function (req, res) {
  res.redirect('add-ip-address-check')
})

router.post('/add-ip-address-check', function (req, res) {
  if (req.session.data['add-ip-address-check'] == 'Yes') {
    res.redirect('add-ip-address')
  } else {
    res.redirect('add-ip-comment')
  }
})

router.post('/add-ip-address', function (req, res) {
  res.redirect('add-ip-comment')
})

router.post('/add-ip-comment', function (req, res) {
  res.redirect('add-ip-comment-redacted-received-date')
})

router.post('/add-ip-comment-redacted-received-date', function (req, res) {
  res.redirect('add-ip-cya')
})

router.post('/add-ip-cya', function (req, res) {
  res.redirect('ip-comments?new-comment=true&manually-added-comment=true&comments-shared=')
})

router.post('/add-ip-review', function (req, res) {
  if (req.session.data['add-ip-comment-review'] == 'valid') {
    res.redirect('ip-comments?acceptedComment=yes&commentReview=true')
  } else {
    res.redirect('add-ip-reject-comment')
  }
})

// attaching supporting documents

// ask for the first document
router.post('/upload-extra-supporting-document', function (req, res) {
  res.redirect('extra-document-received-date')
})

// what date was it received?
router.post('/extra-document-received-date', function (req, res) {
  res.redirect('extra-document-redaction-status')
})

// ask if there a redacted version
router.post('/extra-document-redaction-status', function (req, res) {
  if (req.session.data['redaction-status'] == 'Yes') {
    res.redirect('upload-redacted-extra-document')
  } else {
    res.redirect('extra-supporting-documents')
  }
})

// upload the redacted version
router.post('/upload-redacted-extra-document', function (req, res) {
  res.redirect('extra-supporting-documents')
})


router.post('/extra-supporting-documents', function (req, res) {
  if (req.session.data['other-document'] == 'Yes') {
    res.redirect('upload-extra-supporting-document?anotherdocument=yes')
  } else {
    res.redirect('confirm-extra-documents')
  }
})

// Add your routes above the module.exports line
module.exports = router
