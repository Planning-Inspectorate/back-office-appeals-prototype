const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Casework Back Office System - Appeals'
  next()
})

// adding a manual statement

// IP contact details
router.post('/add-r6-name-and-email', function (req, res) {
  res.redirect('add-r6-statement-check')
})

// see if the IP gave us an address
router.post('/add-r6-statement-check', function (req, res) {
  if (req.session.data['add-r6-statement-check'] == 'Yes') {
    res.redirect('add-r6-statement')
  } else {
    res.redirect('add-r6-statement')
  }
})

// add address
router.post('/add-r6-statement', function (req, res) {
  res.redirect('add-r6-statement')
})

// add R6 statement
router.post('/add-r6-statement', function (req, res) {
  res.redirect('add-r6-statement-redacted-status')

})

// add redacted status
router.post('/add-r6-statement-redacted-status', function (req, res) {
  res.redirect('add-r6-statement-received-date')
})

// add received date
router.post('/add-r6-statement-received-date', function (req, res) {
  res.redirect('add-r6-cya')
})

// check answers
router.post('/add-r6-cya', function (req, res) {
  res.redirect('r6-statements?new-statement=true&manually-added-statement=true&statements-shared=')
})

// attaching supporting documents

// upload the document
// set the date and redacted status
router.post('/upload-extra-supporting-document', function (req, res) {
  res.redirect('extra-document-redacted-status')
})

// set the date and redacted status
router.post('/extra-document-redacted-status', function (req, res) {
  res.redirect('extra-document-received-date')
})

// go to check answers
router.post('/extra-document-received-date', function (req, res) {
  res.redirect('extra-document-cya')
})

router.post('/extra-document-cya', function (req, res) {
  if (req.session.data['statement-attachment'] == 'review') {
    res.redirect('statement-review?documents-added=yes&statement-attachment=')
  } else {
    res.redirect('statement-view?documents-added=yes&statement-attachment=')
  }
})

router.post('/statement-review', function (req, res) {
  if (req.session.data['r6-statement-review'] == 'Reject statement') {
    res.redirect('reject-statement?address-added=&reason-format=list')
  } else if (req.session.data['r6-statement-review'] == 'Redact and accept statement') {
    res.redirect('statement-redact?address-added=&redactingfrom=review')
  } else {
    res.redirect('rule-6-statements?statementReview=true&acceptedstatement=yes')
  }
})

// change address
router.post('/change-address', function (req, res) {
  if (req.session.data['address-for'] == 'review') {
    res.redirect('statement-review?address-changed=true')
  } else {
    res.redirect('statement-view?address-changed=true')
  }
})


// add address
router.post('/add-address', function (req, res) {
  res.redirect('check-address')
})

router.post('/check-address', function (req, res) {
  if (req.session.data['address-for'] == 'review') {
    res.redirect('statement-review?add-r6-statement-check=Yes&address-added=success')
  } else {
    res.redirect('statement-view?add-r6-statement-check=Yes&address-added=success')
  }
})

router.post('/check-remove-site-visit', function (req, res) {
  if (req.session.data['confirm-remove-site-visit'] == 'yes') {
    res.redirect('statement-view?siteVisitRequest=&address-added=yes')
  } else {
    res.redirect('statement-view?siteVisitRequest=yes&address-added=yes')
  }
})

router.post('/allow-resubmission', function (req, res) {
  res.redirect('check-reason-for-rejection')
})


router.post('/check-reason-for-rejection', function (req, res) {
  req.flash('success', 'Statement rejected')
  res.redirect('rule-6-statements')
})

router.post('/confirm-withdraw-statement', function (req, res) {
  req.flash('success', 'Statement withdrawn')
  res.redirect('rule-6-statements')
})



// Add your routes above the module.exports line
module.exports = router
