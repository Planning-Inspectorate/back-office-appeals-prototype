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
    } else if (reason === 'Request to withdraw appeal'){
      res.redirect('upload-withdraw-request')
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

  router.post('/cancel-appeal/upload-withdraw-request', function (req, res) {
    res.redirect('check-withdraw-request')
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
    if (reviewDecision === 'Valid') {
      res.redirect('ground-a')
    } else {
      res.redirect('enf-notice-invalid')
    }
  })


  router.post('/appeal-incomplete-reason', function (req, res) {
    const reasons = req.session.data['incomplete'] || []; // assuming this is the array of selected reasons

    if (reasons.includes('Missing documents')) {
      res.redirect('missing-docs');
    } else if (reasons.includes('Grounds and facts do not match')) {
      res.redirect('grounds');
    } else if (reasons.includes('Waiting for the appellant to pay the fee')) {
      res.redirect('receipt-date');
    } else if (reasons.length === 0) {
      res.redirect('other-information-incomplete');
    } else {
      res.redirect('other-information-incomplete');
    }
  });

  // Handle the flow after missing-docs
  router.post('/missing-docs', function (req, res) {
    res.redirect('update-due-date');
  });

  // Handle the flow after update-due-date
  router.post('/update-due-date', function (req, res) {
    const reasons = req.session.data['incomplete'] || [];
    
    if (reasons.includes('Grounds and facts do not match')) {
      res.redirect('grounds');
    } else if (reasons.includes('Waiting for the appellant to pay the fee')) {
      res.redirect('receipt-date');
    } else {
      res.redirect('check-appeal-incomplete');
    }
  });

  // Handle the flow after other-information
  router.post('/grounds', function (req, res) {
    const reasons = req.session.data['incomplete'] || [];
    
    if (reasons.includes('Waiting for the appellant to pay the fee')) {
      res.redirect('receipt-date');
    } else {
      res.redirect('other-information-incomplete');
    }
  });

  // Handle the flow after receipt-date
  router.post('/receipt-date', function (req, res) {
    res.redirect('other-information-incomplete');
  });

    router.post('/other-information-incomplete', function (req, res) {
      const enfNotice = req.body.enfNotice || req.session.data.enfNotice;
  
      if (enfNotice === 'No') {
        res.redirect('check-appeal-incomplete')
      } else {
        res.redirect('check-incomplete-enf-invalid')
      }
  });

  router.post('/enf-notice-invalid', function (req, res) {
    const enfNotice = req.body.enfNotice;
    const reviewDecision = req.session.data['reviewDecision']; // Retrieve reviewDecision from session data
    if (enfNotice === 'No' && reviewDecision === 'Invalid') {
      res.redirect('appeal-invalid-reason')
    } else if (enfNotice === 'No' && reviewDecision === 'Incomplete') {
      res.redirect('appeal-incomplete-reason')
    } else {
      res.redirect('enforcement-invalid-reason')
    }
    })

    router.post('/check-incomplete-enf-invalid', function (req, res) {
      res.redirect('case-details-incomplete')
    })

  router.post('/enforcement-incomplete-reason', function (req, res) {
    res.redirect('update-due-date')
  })

  router.post('/appeal-invalid-reason', function (req, res) {
      res.redirect('linked-appeals-check')
  })

  router.post('/enforcement-invalid-reason', function (req, res) {
    const reviewDecision =
      req.body.reviewDecision || req.session.data.reviewDecision;
  
    if (reviewDecision === 'Invalid') {
      res.redirect('other-information-invalid');
    } else if (reviewDecision === 'Incomplete') {
      res.redirect('other-information-incomplete');
    } else {
      res.redirect('enforcement-invalid-reason');
    }
  });

  router.post('/other-information-invalid', function (req, res) {
    res.redirect('check-enf-notice')
  })

  router.post('/check-enf-notice', function (req, res) {
    res.redirect('case-details-invalid')
  })

// /linked-appeals-check
router.post('/linked-appeals-check', (req, res) => {
    // Example of saving linked appeal answer
    req.session.data['linkedAppeals'] = req.body.linkedAppeals
    res.redirect('check')
  })

  router.post('/check', function (req, res) {
    res.redirect('appeal-invalid')
  })

  router.post('/check-invalid', function (req, res) {
    res.redirect('case-details-invalid')
  })

  router.post('/check-appeal-incomplete-fee', function (req, res) {
    res.redirect('case-details-incomplete')
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
    // ensure session data object exists
    req.session.data = req.session.data || {};
  
    // save groundA choice
    req.session.data.groundA = req.body.groundA;
  
    // redirect to the next page
    res.redirect('other-information-valid'); 
  });

  router.post('/other-information-valid', function (req, res) {
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