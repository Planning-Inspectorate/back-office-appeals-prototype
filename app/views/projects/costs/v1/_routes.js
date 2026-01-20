const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'
  next()
})

// START OF ROUTES
// ———————————————

// something
router.post('/page', function (req, res) {
  res.redirect('another-page')
})


// Add your routes above the module.exports line
module.exports = router
