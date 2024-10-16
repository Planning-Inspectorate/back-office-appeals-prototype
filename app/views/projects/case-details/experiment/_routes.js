const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// Add a case note
router.post('/case-details', function (req, res) {
  res.redirect('?newnote=true')
})


// Add your routes above the module.exports line
module.exports = router
