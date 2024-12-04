const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// see if the IP gave us an address
router.post('/document-review', function (req, res) {
  if (req.session.data['document-review-decision'] == 'Reject appellant proof of evidence and witnesses') {
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

// uploading a new document
router.post('/upload-document-date', function (req, res) {
  res.redirect('upload-document-check-your-answers')
})

router.post('/upload-document-check-your-answers', function (req, res) {
  req.flash('success', 'Proof of evidence and witnesses added')
  res.redirect('documents')
})

// changing the appeal procedure
router.post('/reject-documents', function (req, res) {
  res.redirect('check-your-answers')
})

// changing the appeal procedure
router.post('/check-your-answers', function (req, res) {
  if (req.session.data['document-review-decision'] == 'Accept appellant proof of evidence and witnesses') {
    req.flash('success', 'Appellant proof of evidence and witnesses accepted')
    if (req.session.data['party'] == 'rule6') {
      res.redirect('rule-6-proof-and-witnesses?rule6proofReview=completed&rule6proofReviewStatus=accepted')
    } else {
      res.redirect('case-details?appellantproofReview=completed')
    }
  } else {
    req.flash('success', 'Appellant proof of evidence and witnesses rejected')
    if (req.session.data['party'] == 'rule6') {
      res.redirect('rule-6-proof-and-witnesses?rule6proofReview=completed&rule6proofReviewStatus=rejected')
    } else {
      res.redirect('case-details?appellantproofReview=completed')
    }
  }
})

// sharing proof of evidence and witnesses
router.post('/share-proof-and-witnesses', function (req, res) {
  req.flash('success', 'Proof of evidence and witnesses shared')
  res.redirect('case-details?proof-shared=yes')
})

// Add your routes above the module.exports line
module.exports = router
