const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'
  next()
})


// Add a case note
router.post('/case-details', function (req, res) {
  res.redirect('?newnote=true')
})


// Reset then go to v3 decision page (fresh state)
router.get('/reset', function (req, res) {
  req.session.data = {}; // clear all prototype data
  res.redirect('decision');
});



// 1) Save reason and go to upload page
router.post('/reason', function (req, res) {
  const { reason } = req.body
  req.session.data['reason'] = reason
  return res.redirect('upload-decision')
})

// 2) After upload, branch based on reason
router.post('/upload-decision', function (req, res) {
  const reason = req.session.data['reason'] // <-- read from .data
  if (reason === 'Incorrect decision date') {
    return res.redirect('check-your-answers')
  } else {
    return res.redirect('correction-notice')
  }
})

// 3) From correction notice page, save text then continue to CYA
router.post('/correction-notice', function (req, res) {
  // Assuming your textarea/input on correction-notice.html is named "correction"
  req.session.data['correction'] = req.body.correction
  return res.redirect('/check-your-answers')
})

// Add your routes above the module.exports line
module.exports = router
