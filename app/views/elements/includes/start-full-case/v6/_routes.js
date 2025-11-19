const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// part 1 check (not used)
router.post('/part1-check', function (req, res) {
  if (req.session.data['part1check'] == 'No') {
    res.redirect('procedure')
  } else {
    res.redirect('check-your-answers')
  }
})

// procedure
router.post('/procedure', function (req, res) {
  res.redirect('check-your-answers')
})

// check answers
router.post('/check-your-answers', function (req, res) {
  req.flash('success', 'Appeal started')
  res.redirect('case')
})




// Add your routes above the module.exports line
module.exports = router
