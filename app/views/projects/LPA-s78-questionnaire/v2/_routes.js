const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// SETTING UP
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.get('*', function(req, res, next){

  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage my appeals'

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

router.post('/constraints/appropriate', function (req, res) {
  res.redirect('affected-listed-building-check')
})

router.post('/constraints/affected-listed-building-check', function (req, res) {
  if (req.session.data['affected-listed-building-check'] == 'Yes') {
    res.redirect('affected-listed-building-details');
  } else {
    res.redirect('conservation-check')
  }
})

router.post('/constraints/affected-listed-building-details', function (req, res) {
  res.redirect('affected-listed-buildings?listed-building=yes')
})

router.post('/constraints/affected-listed-buildings', function (req, res) {
  req.session.data['affected-listed-buildings-complete'] = 'true'
  if (req.session.data['affected-listed-buildings'] == 'Yes') {
    res.redirect('affected-listed-building-details?extrabuildingsaffected=yes');
  } else {
    res.redirect('conservation-check')
  }
})

router.post('/constraints/conservation-check', function (req, res) {
  req.session.data['conservation-check-complete'] = 'true'
  if (req.session.data['conservation-check'] == 'Yes') {
    res.redirect('conservation-upload');
  } else {
    res.redirect('green-belt')
  }
})

router.post('/constraints/conservation-upload', function (req, res) {
  req.session.data['conservation-upload-complete'] = 'true'
  res.redirect('green-belt')
})

router.post('/constraints/green-belt', function (req, res) {
  req.session.data['green-belt-complete'] = 'true'
  req.session.data['constraints-completed'] = 'true'
  res.redirect('../notified/notified-how')
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// NOTIFIED PEOPLE
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/notified/notified-how', function (req, res) {

  if (req.session.data['notified-how']?.includes('Site notice')) {
    res.redirect('site-notice-upload');
  } else if (req.session.data['notified-how']?.includes('Letters to neighbours')) {
    res.redirect('letters-upload');
  } else {
    req.session.data['notified-how'] = 'Advertisement'
    res.redirect('press-advert-upload');
  }

})

router.post('/notified/site-notice-upload', function (req, res) {
  req.session.data['site-notice-uploaded'] = 'true'
  // checkbox routing
  if (req.session.data['notified-how']?.includes('Letters to neighbours')) {
    res.redirect('letters-upload');
  } else if (req.session.data['notified-how']?.includes('Advertisement')) {
    res.redirect('press-advert-upload');
  } else {
    req.session.data['notified-completed'] = 'true'
    res.redirect('../consultation/other-parties-check');
  }
})

router.post('/notified/letters-upload', function (req, res) {
  req.session.data['letters-uploaded'] = 'true'

  if (req.session.data['notified-how']?.includes('Advertisement')) {
    res.redirect('press-advert-upload');
  } else {
    req.session.data['notified-completed'] = 'true'
    res.redirect('../consultation/other-parties-check');

  }
})

router.post('/notified/press-advert-upload', function (req, res) {
  req.session.data['advert-uploaded'] = 'true'
  req.session.data['notified-completed'] = 'true'
  res.redirect('../consultation/other-parties-check');

})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// CONSULTATION AND REPRESENTATIONS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/consultation/other-parties-check', function (req, res) {

  req.session.data['other-parties-checked'] = 'true'
  req.session.data['consultation-started'] = 'true'

  if (req.session.data['other-parties-check'] == 'Yes') {
    req.session.data['consultation-completed'] = 'false'
    res.redirect('other-parties-upload');
  } else {
    req.session.data['consultation-completed'] = 'true'
    res.redirect('../po-report/report-upload');
  }
})

router.post('/consultation/other-parties-upload', function (req, res) {
  req.session.data['other-parties-uploaded'] = 'true'
  req.session.data['consultation-completed'] = 'true'
  res.redirect('../po-report/report-upload');
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// PO REPORT
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/po-report/report-upload', function (req, res) {
  req.session.data['po-report-uploaded'] = 'true'
  req.session.data['po-report-completed'] = 'true'
  res.redirect('../site-access/site-entry')
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// SITE ACCESS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/site-access/site-entry', function (req, res) {
  req.session.data['site-entry-complete'] = 'true'
  req.session.data['site-access-started'] = 'true'
  res.redirect('neighbours-land')
})

router.post('/site-access/neighbours-land', function (req, res) {
  req.session.data['neighbours-land-complete'] = 'true'
  if (req.session.data['neighbours-land'] == 'Yes') {
    if (req.session.data['neighbours-land--version'] != 'short') {
      res.redirect('neighbours-land-reasons');
    } else {
      res.redirect('neighbours-address');
    }
  } else {
    res.redirect('health-and-safety')
  }
})

router.post('/site-access/neighbours-land-reasons', function (req, res) {
  req.session.data['neighbours-reasons-complete'] = 'true'
  res.redirect('neighbours-address');
})

router.post('/site-access/neighbours-address', function (req, res) {
  req.session.data['neighbours-address-complete'] = 'true'
  res.redirect('neighbours-contact-details');
})

router.post('/site-access/neighbours-contact-details', function (req, res) {
  req.session.data['neighbours-contact-complete'] = 'true'
  res.redirect('neighbours')
})

router.post('/site-access/neighbours', function (req, res) {
  if (req.session.data['add-neighbours'] == 'Yes') {
    res.redirect('neighbours-address?affectedneighbours=yes');
  } else {
    res.redirect('health-and-safety')
  }
})

router.post('/site-access/health-and-safety', function (req, res) {

  req.session.data['health-and-safety-complete'] = 'true'
  req.session.data['site-access-completed'] = 'true'

  res.redirect('../appeal-process/procedure')
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// APPEAL PROCESS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/appeal-process/procedure', function (req, res) {
  req.session.data['procedure-complete'] = 'true'
  req.session.data['appeal-process-started'] = 'true'
  res.redirect('other-appeals')
})

router.post('/appeal-process/other-appeals', function (req, res) {
  req.session.data['other-appeals-complete'] = 'true'
  res.redirect('extra-conditions');
})

router.post('/appeal-process/extra-conditions', function (req, res) {
  req.session.data['extra-conditions-complete'] = 'true'
  req.session.data['appeal-process-completed'] = 'true'
  res.redirect('../task-list')
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// SAVE AND RETURN
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.get('/save-and-return/', function (req, res) {
  if (req.session.data['applicant-email']) {
    req.session.data['save-email'] = req.session.data['applicant-email']
  } else {
    req.session.data['save-email'] = 'email@example.com'
  }

  if (req.session.data['save-email-confirmed']) {
    res.redirect('saved')
  } else {
    res.redirect('confirm')
  }
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// REVIEW OUTCOME
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('task-list', function (req, res) {
  if (req.session.data['lpaq-outcome'] == 'LPA questionnaire is incomplete') {
    res.redirect('questionnaire-incomplete');
  } else {
    res.redirect('check-environmental-statement')
  }
})

// Add your routes above the module.exports line
module.exports = router
