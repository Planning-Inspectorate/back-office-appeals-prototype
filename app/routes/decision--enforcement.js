

module.exports = router => {


  //Issue decision letter when invalid
  router.post('/main/appeals/decision/enforcement/decision', function (req, res) {
     res.redirect(`/main/appeals/decision/enforcement/decision-letter`)
  })

  router.post('/main/appeals/decision/enforcement/decision-letter', function (req, res) {
    res.redirect('/main/appeals/decision/enforcement/has-appellant-costs-decision')
 })

 router.post('/main/appeals/decision/enforcement/has-appellant-costs-decision', function (req, res) {
  const decision = req.body.issueDecision?.hasAppellantCostsDecision;
  if (decision === 'Yes') {
    res.redirect('/main/appeals/decision/enforcement/appellant-costs-decision-letter')
  }
  res.redirect('/main/appeals/decision/enforcement/has-lpa-costs-decision')
})

router.post('/main/appeals/decision/enforcement/appellant-costs-decision-letter', function (req, res) {
  res.redirect('/main/appeals/decision/enforcement/has-lpa-costs-decision')
})

router.post('/main/appeals/decision/enforcement/has-lpa-costs-decision', function (req, res) {
  const decision = req.body.issueDecision?.hasLPACostsDecision;
  if (decision === 'Yes') {
    res.redirect('/main/appeals/decision/enforcement/lpa-costs-decision-letter')
  }
  res.redirect('/main/appeals/decision/enforcement/check')
})

router.post('/main/appeals/decision/enforcement/lpa-costs-decision-letter', function (req, res) {
  res.redirect('/main/appeals/decision/enforcement/check')
})

  // Check page: issue decision confirmation
  router.post('/main/appeals/decision/enforcement/check', function (req, res) {
    req.session.decisionIssued = true;
    // Redirect to case-details with success flag
    res.redirect('/main/appeals/decision/enforcement/case-details?success=decision-issued');
  });

  // Case details page
  router.get('/main/appeals/decision/enforcement/case-details', function (req, res) {
    const decisionIssued = req.session.decisionIssued === true;
  
    // Clear it immediately so it only shows once
    req.session.decisionIssued = false;
  
    res.render('/main/appeals/decision/enforcement/case-details', {
      appeal: req.appeal,
      success: decisionIssued,
      hideDecisionBanner: decisionIssued
    });
  });

}
