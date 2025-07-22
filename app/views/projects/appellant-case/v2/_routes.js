const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// Add a case note
router.post('/part1-check', function (req, res) {
  if (req.session.data['part1check'] == 'No') {
    res.redirect('procedure')
  } else {
    res.redirect('check-your-answers')
  }
})

// Add a case note
router.post('/procedure', function (req, res) {
  res.redirect('check-your-answers')
})

// Add your routes above the module.exports line
module.exports = router
