const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  req.session.data['case-stage'] = 'questionnaire'
  req.session.data.appealProcedure = 'Inquiry'
  next()
})

// changing the appeal procedure
router.post('/comment-review', function (req, res) {
  if (req.session.data['review-outcome'] == 'Redact and accept comment') {
    res.redirect('redact-comment')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/redact-comment', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/check-your-answers', function (req, res) {
  if (req.session.data['review-outcome'] == 'Reject comment') {
    req.flash('success', 'Final comments rejected')
    res.redirect('case-details?finalcommentreview=completed')
  } else {
    req.flash('success', 'Final comments accepted')
    res.redirect('case-details?finalcommentreview=completed')
  }
})

router.post('/share-final-comments', function (req, res) {
  req.flash('success', 'Final comments shared')
  res.redirect('case-details?finalcommentreview=shared&allfinalcommentreview=')
})

// Add your routes above the module.exports line
module.exports = router
