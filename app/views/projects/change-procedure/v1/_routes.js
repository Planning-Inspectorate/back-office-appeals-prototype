const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// adding a manual comment

// IP contact details
router.post('/add-ip-name-and-email', function (req, res) {
  res.redirect('add-ip-address-check')
})

// see if the IP gave us an address
router.post('/change-procedure', function (req, res) {
  if (req.session.data['change-procedure'] == 'hearing') {
    res.redirect('set-hearing-stage')
  } else {
    res.redirect('set-inquiry-stage')
  }
})

// Add your routes above the module.exports line
module.exports = router
