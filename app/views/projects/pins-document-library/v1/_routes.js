const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'PINS Library'
  next()
})

// add routes here




// Add your routes above the module.exports line
module.exports = router
