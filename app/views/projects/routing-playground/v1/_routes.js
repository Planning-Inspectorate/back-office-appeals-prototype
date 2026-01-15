const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/cancel-reason', function (req, res) {
    const reason = req.session.data['cancel-reason']
    if (reason === 'LPA has withdrawn the enforcement notice') {
      res.redirect('upload-withdrawal')
    } else if (reason === 'Request to withdraw appeal'){
      res.redirect('upload-withdraw-request')
    } else {
      // Fallback or default route if no match
      res.redirect('appeal-invalid-reason')
    }
  })

  router.post('/appeal-invalid-reason', function (req, res) {
    const reasons = req.session.data['invalid'] || []  // always an array
    if (reasons.includes('Appellant does not have a legal interest in the land')) {
      res.redirect('legal-interest-information') 
    } else {
      // fallback or default route
      res.redirect('linked-appeals')
    }
  })

  router.post('/linked-appeals', function (req, res) {
    res.redirect('check')
  })

  router.post('/legal-interest-information', function (req, res) {
    res.redirect('linked-appeals')
  })

  router.post('/linked-appeals', function (req, res) {
    res.redirect('check')
  })

  router.post('/upload-withdraw-request', function (req, res) {
    res.redirect('check')
  })

  router.post('/upload-withdrawal', function (req, res) {
    res.redirect('check')
  })

// Add your routes above the module.exports line
module.exports = router