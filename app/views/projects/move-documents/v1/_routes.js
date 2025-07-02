const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// Add a case note
router.post('/check-your-answers', function (req, res) {
  req.session.data['new-location'] = 'Caitlin Lovays'
  req.flash('success', 'File location updated')
  res.redirect('document-details')
})


// Add your routes above the module.exports line
module.exports = router
