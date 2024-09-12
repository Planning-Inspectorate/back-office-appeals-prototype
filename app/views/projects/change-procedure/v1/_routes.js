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
  req.session.data['inquiry-statements-due-date-day'] = '22'
  res.redirect('set-inquiry-timetable')
})

// Add your routes above the module.exports line
module.exports = router
