const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  req.session.data['case-stage'] = 'questionnaire'
  next()
})



// Add your routes above the module.exports line
module.exports = router
