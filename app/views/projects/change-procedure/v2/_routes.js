const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// changing the appeal procedure
router.post('/change-procedure', function (req, res) {
  res.redirect('check-new-evidence')
})

// setting the stage for an inquiry
router.post('/set-inquiry-stage', function (req, res) {
  res.redirect('check-case-management-conference')
})

// asking whether we need another CMC
router.post('/check-new-evidence', function (req, res) {
  res.redirect('timetable')
})

// setting the stage for an inquiry
router.post('/timetable', function (req, res) {
  res.redirect('check-answers')
})

// changing the appeal procedure
router.post('/check-answers', function (req, res) {
  res.redirect('confirmation')
})

// Add your routes above the module.exports line
module.exports = router
