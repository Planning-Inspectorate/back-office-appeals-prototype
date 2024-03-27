const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'

  next()
})

router.post('/invalid', function (req, res) {
  res.redirect('check-your-answers-invalid')
})

router.post('/check-your-answers-invalid', function (req, res) {
  res.redirect('confirmation-invalid')
})

router.post('/upload-decision', function (req, res) {
  res.redirect('decision-date')
})



// Add your routes above the module.exports line
module.exports = router
