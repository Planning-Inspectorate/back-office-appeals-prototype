const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'

  next()
})


router.post('/upload-decision', function (req, res) {
  res.redirect('decision-date')
})

router.post('/decision-date', function (req, res) {
  res.redirect('check-your-answers')
})


router.post('/check-your-answers', function (req, res) {
  res.redirect('confirmation')
})


// Add your routes above the module.exports line
module.exports = router
