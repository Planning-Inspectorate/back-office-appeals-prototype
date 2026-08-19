const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'
  next()
})

// part 1 check (not used)
router.post('/case-type', function (req, res) {
  res.redirect('check-answers')
})

// update procedure
router.post('/set-procedure', function (req, res) {
  req.flash('success', 'Case started')
  res.redirect('case-details?status=open')
})

// update procedure
router.post('/procedure', function (req, res) {
  res.redirect('case-details')
})

// check answers
router.post('/check-answers', function (req, res) {
  req.flash('success', 'Case created')
  
  req.session.data.casecreated = 'Yep'
5
  res.redirect('case-details')
})




// Add your routes above the module.exports line
module.exports = router
