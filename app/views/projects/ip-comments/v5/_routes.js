const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Comment on a planning appeal'
  next()
})

router.post('/extra-document-redaction-status', function (req, res) {
  if (req.session.data['redaction-status'] == 'needs redaction') {
    res.redirect('upload-redacted-extra-document')
  } else {
    res.redirect('extra-documents')
  }
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
