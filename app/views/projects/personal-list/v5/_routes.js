const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'
  next()
})

// Filter the personal list

 router.post('/index', function (req, res) {
    const selected = req.session.data['appeal-status-filter'] || [];

    const allFilters = {
      'Validation': 'appeal-status-validation',
      'Ready to start': 'appeal-status-ready',
      'Questionnaire': 'appeal-status-questionnaire',
      'Waiting for event': 'appeal-status-event',
      'Issue decision': 'appeal-status-decision'
    };

    // Set each filter to true or false in session data
    for (const [label, key] of Object.entries(allFilters)) {
      req.session.data[key] = selected.includes(label);
    }

    res.redirect('/projects/personal-list/v5/index');
  });


// Add your routes above the module.exports line
module.exports = router
