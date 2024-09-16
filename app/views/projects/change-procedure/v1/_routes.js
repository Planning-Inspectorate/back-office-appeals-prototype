const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// changing the appeal procedure
router.post('/change-procedure', function (req, res) {
  if (req.session.data['change-procedure'] == 'hearing') {
    res.redirect('set-hearing-stage')
  } else {
    res.redirect('set-inquiry-stage')
  }
})

// setting the stage for an inquiry
router.post('/set-inquiry-stage', function (req, res) {
  res.redirect('check-case-management-conference')
})

// asking whether we need another CMC
router.post('/check-case-management-conference', function (req, res) {
  res.redirect('set-inquiry-timetable')
})

// setting the stage for an inquiry
router.post('/set-inquiry-timetable', function (req, res) {
  res.redirect('timetable?appeal-type=S78inquiry')
})

// Add your routes above the module.exports line
module.exports = router
