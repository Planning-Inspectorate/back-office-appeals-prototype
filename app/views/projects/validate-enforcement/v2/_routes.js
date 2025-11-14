const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/cancel-appeal/cancel-reason', function (req, res) {
    const reason = req.session.data['cancel-reason']
    if (reason === 'The enforcement notice is invalid') {
      res.redirect('lpa-reply')
    } else if (reason === 'LPA has withdrawn the enforcement notice') {
      res.redirect('upload-withdrawal')
    } else if (reason === 'Appeal invalid'){
        res.redirect('appeal-invalid-reason')
    } else if (reason === 'Did not receive more information'){
        res.redirect('information-request')
    } else if (reason === 'Did not submit application or pay fee'){
        res.redirect('check-fee')
    } else {
      // Fallback or default route if no match
      res.redirect('cancel-reason')
    }
  })

  router.post('/cancel-appeal/information-request', function (req, res) {
    res.redirect('check-information')
  })

  router.post('/cancel-appeal/appeal-invalid-reason', function (req, res) {
    const reasons = req.session.data['invalid'] || []  // always an array
    if (reasons.includes('Appellant does not have a legal interest in the land')) {
      res.redirect('legal-interest-information')
    } else {
      // fallback or default route
      res.redirect('check-appeal-invalid')
    }
  })

  router.post('/cancel-appeal/legal-interest-information', function (req, res) {
    res.redirect('check-legal-interest')
  })

  router.post('/cancel-appeal/check-legal-interest', function (req, res) {
    res.redirect('../appeal-invalid')
  })

  router.post('/cancel-appeal/upload-withdrawal', function (req, res) {
    res.redirect('check-withdraw')
  })
  router.post('/cancel-appeal/lpa-reply', function (req, res) {
    res.redirect('check-invalid')
  })

  router.post('/enforcement-appeal', function (req, res) {
    const reviewDecision = req.session.data['reviewDecision']
    if (reviewDecision === 'Invalid') {
      res.redirect('appeal-invalid-reason')
    } else if (reviewDecision === 'Incomplete') {
      res.redirect('appeal-incomplete-reason')
    } else {
      res.redirect('ground-a')
    }
  })

  router.post('/enforcement-appeal-incomplete', function (req, res) {
    const reviewDecision = req.session.data['reviewDecision']
    if (reviewDecision === 'Invalid') {
      res.redirect('appeal-invalid-reason')
    } else if (reviewDecision === 'Incomplete') {
      res.redirect('appeal-incomplete-reason')
    } else {
      // If "Valid" or nothing selected
      res.redirect('enforcement-appeal')
    }
  })

  router.post('/enforcement-incomplete-reason', function (req, res) {
    res.redirect('update-due-date')
  })

  router.post('/update-due-date', function (req, res) {
    res.redirect('check-incomplete')
  })

  router.post('/appeal-invalid-reason', function (req, res) {
    const invalid = req.session.data['invalid'] || []
  
    if (invalid.includes('Appellant does not have a legal interest in the land')) {
      res.redirect('linked-appeals-check')
    } else if (invalid.includes('Enforcement notice is invalid')) {
      res.redirect('enforcement-invalid-reason')
    } else {
      res.redirect('appeal-invalid-reason')
    }
  })

  router.post('/enforcement-invalid-reason', function (req, res) {
    res.redirect('check')
  })

// /linked-appeals-check
router.post('/linked-appeals-check', (req, res) => {
    // Example of saving linked appeal answer
    req.session.data['linkedAppeals'] = req.body.linkedAppeals
    res.redirect('check')
  })

  router.post('/appeal-incomplete-reason', function (req, res) {
    const reasons = req.session.data['incomplete'] || []  // always an array
    if (reasons.includes('Grounds and facts do not match')) {
      res.redirect('grounds')
    } else if (reasons.includes('Waiting for the appellant to pay the fee')) {
        res.redirect('update-due-date')
    } else if (reasons.includes('Ground (a) barred')) {
        res.redirect('other-grounds')
    } else if (reasons.includes('No ground (a)')) {
        res.redirect('update-due-date')
    } else {
      // fallback or default route
      res.redirect('appeal-incomplete-reason')
    }
  })

  router.post('/grounds', function (req, res) {
    res.redirect('other-information')
  })

  router.post('/other-information', function (req, res) {
    res.redirect('check-grounds')
  })

  router.post('/other-grounds', function (req, res) {
    res.redirect('appeal-due-date')
  })

  router.post('/appeal-due-date', function (req, res) {
    res.redirect('check-appeal-incomplete')
  })

  router.post('/check-grounds', function (req, res) {
    res.redirect('enforcement-appeal-incomplete')
  })

  router.post('/check', function (req, res) {
    res.redirect('appeal-invalid')
  })

  router.post('/check-invalid', function (req, res) {
    res.redirect('case-details-invalid')
  })

  router.post('/check-incomplete', function (req, res) {
    res.redirect('enforcement-appeal-incomplete')
  })

  router.post('/cancel-appeal/check-fee', function (req, res) {
    res.redirect('../case-details-cancelled')
  })

  router.post('/check-appeal-incomplete', function (req, res) {
    res.redirect('enforcement-appeal-incomplete')
  })

  router.post('/cancel-appeal/check-withdraw', function (req, res) {
    res.redirect('../case-details-withdrawn')
  })

  router.post('/cancel-appeal/check-invalid', function (req, res) {
    res.redirect('../case-details-invalid')
  })

  router.post('/cancel-appeal/check-invalid', function (req, res) {
    req.session.data['appealStatus'] = 'invalid'
    res.redirect('../case-details')
  })

  router.post('/cancel-appeal/check-information', function (req, res) {
    res.redirect('../case-details-cancelled')
  })

  router.post('/ground-a', function (req, res) {
    res.redirect('valid-date')
  })

  router.post('/valid-date', function (req, res) {
    res.redirect('check-valid')
  })

  router.post('/check-valid', function (req, res) {
    res.redirect('appeal-valid')
  })

// Add your routes above the module.exports line
module.exports = router