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

// check answers
router.post('/check-answers', function (req, res) {
  req.flash('success', 'Case created')
  res.redirect('index')
})




// Add your routes above the module.exports line
module.exports = router
