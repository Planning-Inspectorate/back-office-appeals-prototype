const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'
  next()
})

// START OF ROUTES
// ———————————————

// Inviting resonses
router.post('/invite-responses', function (req, res) {
  res.redirect('confirm-sharing')
})

// Check answers / Confirm
router.post('/confirm-sharing', function (req, res) {
  req.flash('success', 'Document shared')
  res.redirect('document-detail?share-status=true&shared-latest-version=true')
})

// Add your routes above the module.exports line
module.exports = router
