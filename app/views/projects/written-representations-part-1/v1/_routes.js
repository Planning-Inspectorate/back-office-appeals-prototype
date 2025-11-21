const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'
  next()
})


// REVIEW / VALIDATE A CASE
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/appellant-case', function (req, res) {
  if (req.session.data['appelant-outcome'] == 'Valid') {
    res.redirect('valid-date')
  } else if (req.session.data['appelant-outcome'] == 'invalid') {
    res.redirect('why-invalid')
  } else {
    res.redirect('incomplete')
  }
})

router.post('/valid-date', function (req, res) {
  if (req.session.data['environmental-statement'] != 'No') {
    res.redirect('environmental-services-team')
  } else {
    req.flash('success', 'Appeal validated')
    res.redirect('appellant-case')
  }
})

router.post('/environmental-services-team', function (req, res) {
  req.flash('success', 'Appeal validated')
  res.redirect('appellant-case?case-stage=ready')
})


// START A CASE / SET PROCEDURE
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

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
  res.redirect('case-details?case-stage=questionnaire')
})



// END OF ROUTES
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

// Add your routes above the module.exports line
module.exports = router
