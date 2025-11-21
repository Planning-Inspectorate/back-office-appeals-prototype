const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'
  next()
})

router.post('/reopen-reason', function (req, res) {
  res.redirect('upload-documents')
})

router.post('/upload-documents', function (req, res) {
  res.redirect('documents-received-date')
})

router.post('/documents-received-date', function (req, res) {
  res.redirect('check-allocation-update')
})

router.post('/check-allocation-update', function (req, res) {
  if (req.session.data['matrix-update'] == 'Yes') {
    res.redirect('select-allocation')
  } else {
    res.redirect('find-inspector')
  }
})

router.post('/select-allocation', function (req, res) {
  res.redirect('select-specialism')
})

router.post('/select-specialism', function (req, res) {
  res.redirect('find-inspector')
})

router.post('/find-inspector', function (req, res) {
  res.redirect('confirm-inspector')
})

router.post('/confirm-inspector', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/check-your-answers', function (req, res) {
  req.flash('success', 'Case reopened')
  res.redirect('case-details?case-stage=new-statements')
})


// Add your routes above the module.exports line
module.exports = router
