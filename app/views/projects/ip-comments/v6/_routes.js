const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// adding a manual comment

// IP contact details
router.post('/add-ip-name-and-email', function (req, res) {
  res.redirect('add-ip-address-check')
})

// see if the IP gave us an address
router.post('/add-ip-address-check', function (req, res) {
  if (req.session.data['add-ip-address-check'] == 'Yes') {
    res.redirect('add-ip-address')
  } else {
    res.redirect('add-ip-comment')
  }
})

// add address
router.post('/add-ip-address', function (req, res) {
  res.redirect('add-ip-comment')
})

// add IP comment
router.post('/add-ip-comment', function (req, res) {
  res.redirect('add-ip-comment-redacted-received-date')
})

// add received date and redacted status
router.post('/add-ip-comment-redacted-received-date', function (req, res) {
  res.redirect('add-ip-cya')
})

// check answers
router.post('/add-ip-cya', function (req, res) {
  res.redirect('ip-comments?new-comment=true&manually-added-comment=true&comments-shared=')
})

// attaching supporting documents

// upload the document
// set the date and redacted status
router.post('/upload-extra-supporting-document', function (req, res) {
  res.redirect('extra-document-redacted-received-date')
})

// go to check answers
router.post('/extra-document-redacted-received-date', function (req, res) {
  res.redirect('extra-documents-cya')
})

router.post('/extra-documents-cya', function (req, res) {
  if (req.session.data['comment-attachment'] == 'review') {
    res.redirect('comment-review?documents-added=yes&comment-attachment=')
  } else {
    res.redirect('comment-view?documents-added=yes&comment-attachment=')
  }
})

// Add your routes above the module.exports line
module.exports = router