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

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// REDIRECT BASED ON PLANNING TYPE
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

function redirectByPlanningType(req, res) {

  if (req.session.data['appealIs'] === 'Enforcement') {
    return res.redirect('/projects/enforcement/v1/case-details')
  }

  if (req.session.data['appealIs'] === 'Full planning') {
    return res.redirect('/projects/case-details/v5/case-details')
  }

  // No fallback redirect here on purpose (as requested)
  // If nothing matched, just return and let the caller decide.
}


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Setting up a case
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/case-setup--planning-type', function (req, res) {
  res.redirect('case-setup--procedure');
})

router.post('/case-setup--procedure', function (req, res) {
  res.redirect('case-setup--case-stage');
})

router.post('/case-setup--case-stage', function (req, res) {
  if (req.session.data['case-stage'] == 'validation') {
    req.session.data.case = 'not-started';
    if (redirectByPlanningType(req, res)) return
  } else {
    req.session.data.case = 'started';
    res.redirect('case-setup--document-status');
  }
})

router.post('/case-setup--document-status', function (req, res) {
  if (redirectByPlanningType(req, res)) return
})

// Add your routes above the module.exports line
module.exports = router
