const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// SETTING UP
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.get('*', function(req, res, next){

  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'

  // Add return to task list
  res.locals['return'] = false

  next()
})

router.post('*', function(req, res, next){
  if (req.session.data['cya']) {
    delete req.session.data['cya']
    res.redirect('../task-list');
  } else {
    next()
  }
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// CONSTRAINTS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/add-address', function (req, res) {
  res.redirect('check-answers');
})

router.post('/check-answers', function (req, res) {
  req.flash('success', 'Address added')
  res.redirect('case-details?requested-addresses=true');
})


router.post('/confirm-remove-address', function (req, res) {
  req.flash('success', 'Address removed')
  res.redirect('requested-addresses?address-removed=true');
})

router.post('/application-reference', function (req, res) {
  const referrer = req.query.referrer || 'case-details';
  res.redirect(referrer + '?application-reference-updated=true');
})

// Clear application-reference-updated flag after displaying the banner
router.get('/case-details', function (req, res, next) {
  // If the flag is set, clear it from session after this render
  if (req.session.data['application-reference-updated']) {
    // Store it temporarily for this render
    res.locals.showBanner = true;
    // Clear it so it won't show on refresh
    delete req.session.data['application-reference-updated'];
  }
  next();
})

router.get('/enforcement-appeal', function (req, res, next) {
  // If the flag is set, clear it from session after this render
  if (req.session.data['application-reference-updated']) {
    // Store it temporarily for this render
    res.locals.showBanner = true;
    // Clear it so it won't show on refresh
    delete req.session.data['application-reference-updated'];
  }
  next();
})

// Add your routes above the module.exports line
module.exports = router
