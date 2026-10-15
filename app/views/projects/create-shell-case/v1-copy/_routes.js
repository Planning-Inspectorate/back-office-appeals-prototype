const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'
  next()
})

router.post('/case-type', function (req, res) {
  res.redirect('case-submission-date')
})

router.post('/case-submission-date', function (req, res) {
  res.redirect('check-answers')
})

// update procedure
router.post('/set-procedure', function (req, res) {
  req.flash('success', 'Case started')
  // mark the case as open in session so templates can show the open tag
  req.session.data['status'] = 'open'
  res.redirect('case-details?status=open')
})

// update procedure
router.post('/procedure', function (req, res) {
  res.redirect('case-details')
})

// check answers
router.post('/check-answers', function (req, res) {
  req.flash('success', 'Case created')
  
  req.session.data.casestarted = 'Yep'

  res.redirect('case-details?mvp=yes')
})

// Persist mvp query param into session data so templates can read `data['mvp']`
router.get('/case-details', function (req, res, next) {
  if (req.query && typeof req.query.mvp !== 'undefined') {
    req.session.data['mvp'] = req.query.mvp
  }
  if (req.query && typeof req.query.status !== 'open') {
    req.session.data['status'] = req.query.status
  }
  next()
})

// Add your routes above the module.exports line
module.exports = router
