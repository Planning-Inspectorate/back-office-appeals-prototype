const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

//
// START CASE
//

router.post('/start-case/check', function (req, res) {
  req.flash('success', 'Case started')
  req.session.data['case-stage'] = 'questionnaire'
  res.redirect('../case-details')
})

//
// APPEAL PROCEDURE: EDIT
//

router.post('/edit-appeal-procedure/check', function (req, res) {
  req.flash('success', 'Procedure updated')
  res.redirect('../case-details')
})

//
// HEARING: ADD
//

router.post('/add-hearing-details', function (req, res) {
  res.redirect('/projects/start-full-case/v3/add-hearing-details/address')
})

router.post('/add-hearing-details/address', function (req, res) {
  res.redirect('/projects/start-full-case/v3/add-hearing-details/check')
})


router.post('/add-hearing-details/check', function (req, res) {
  req.flash('success', 'Hearing set up')
  res.redirect('../case-details')
})

//
// HEARING: EDIT
//

router.post('/edit-hearing-details', function (req, res) {
  res.redirect('/projects/start-full-case/v3/edit-hearing-details/has-time')
})

router.post('/edit-hearing-details/has-time', function (req, res) {
  if(req.session.data.hearing.hasTime == 'Yes') {
    res.redirect('/projects/start-full-case/v3/edit-hearing-details/time')
  } else {
    res.redirect('/projects/start-full-case/v3/edit-hearing-details/has-address')
  }
})

router.post('/edit-hearing-details/time', function (req, res) {
  res.redirect('/projects/start-full-case/v3/edit-hearing-details/has-address')
})

router.post('/edit-hearing-details/has-address', function (req, res) {
  if(req.session.data.hearing.hasAddress == 'Yes') {
    res.redirect('/projects/start-full-case/v3/edit-hearing-details/address')
  } else {
    res.redirect('/projects/start-full-case/v3/edit-hearing-details/check')
  }
})

router.post('/edit-hearing-details/address', function (req, res) {
  res.redirect('/projects/start-full-case/v3/edit-hearing-details/check')
})

router.post('/edit-hearing-details/check', function (req, res) {
  req.flash('success', 'Hearing details updated')
  res.redirect('../case-details')
})

//
// HEARING ESTIMATES: ADD
//

router.post('/add-hearing-estimates', function (req, res) {
  res.redirect('./add-hearing-estimates/check')
})

router.post('/add-hearing-estimates/check', function (req, res) {
  req.flash('success', 'Hearing estimates added')
  res.redirect('../case-details')
})

//
// HEARING ESTIMATES: EDIT
//

router.post('/edit-hearing-estimates', function (req, res) {
  res.redirect('./edit-hearing-estimates/check')
})

router.post('/edit-hearing-estimates/check', function (req, res) {
  req.flash('success', 'Hearing estimates updated')
  res.redirect('../case-details')
})

//
// INQUIRY: ADD
//

router.post('/add-inquiry-details', function (req, res) {
  res.redirect('/projects/start-full-case/v3/add-inquiry-details/has-time')
})

router.post('/add-inquiry-details/has-time', function (req, res) {
  if(req.session.data.inquiry.hasTime == 'Yes') {
    res.redirect('/projects/start-full-case/v3/add-inquiry-details/time')
  } else {
    res.redirect('/projects/start-full-case/v3/add-inquiry-details/has-address')
  }
})

router.post('/add-inquiry-details/time', function (req, res) {
  res.redirect('/projects/start-full-case/v3/add-inquiry-details/has-address')
})

router.post('/add-inquiry-details/has-address', function (req, res) {
  if(req.session.data.inquiry.hasAddress == 'Yes') {
    res.redirect('/projects/start-full-case/v3/add-inquiry-details/address')
  } else {
    res.redirect('/projects/start-full-case/v3/add-inquiry-details/check')
  }
})

router.post('/add-inquiry-details/address', function (req, res) {
  res.redirect('/projects/start-full-case/v3/add-inquiry-details/check')
})


router.post('/add-inquiry-details/check', function (req, res) {
  req.flash('success', 'Inquiry details added')
  res.redirect('../case-details')
})

//
// INQUIRY: EDIT
//

router.post('/edit-inquiry-details', function (req, res) {
  res.redirect('/projects/start-full-case/v3/edit-inquiry-details/has-time')
})

router.post('/edit-inquiry-details/has-time', function (req, res) {
  if(req.session.data.inquiry.hasTime == 'Yes') {
    res.redirect('/projects/start-full-case/v3/edit-inquiry-details/time')
  } else {
    res.redirect('/projects/start-full-case/v3/edit-inquiry-details/has-address')
  }
})

router.post('/edit-inquiry-details/time', function (req, res) {
  res.redirect('/projects/start-full-case/v3/edit-inquiry-details/has-address')
})

router.post('/edit-inquiry-details/has-address', function (req, res) {
  if(req.session.data.inquiry.hasAddress == 'Yes') {
    res.redirect('/projects/start-full-case/v3/edit-inquiry-details/address')
  } else {
    res.redirect('/projects/start-full-case/v3/edit-inquiry-details/check')
  }
})

router.post('/edit-inquiry-details/address', function (req, res) {
  res.redirect('/projects/start-full-case/v3/edit-inquiry-details/check')
})

router.post('/edit-inquiry-details/check', function (req, res) {
  req.flash('success', 'Inquiry details updated')
  res.redirect('../case-details')
})

//
// INQUIRY ESTIMATES: ADD
//

router.post('/add-inquiry-estimates', function (req, res) {
  res.redirect('./add-inquiry-estimates/check')
})

router.post('/add-inquiry-estimates/check', function (req, res) {
  req.flash('success', 'Inquiry estimates added')
  res.redirect('../case-details')
})

//
// INQUIRY ESTIMATES: EDIT
//

router.post('/edit-inquiry-estimates', function (req, res) {
  res.redirect('./edit-inquiry-estimates/check')
})

router.post('/edit-inquiry-estimates/check', function (req, res) {
  req.flash('success', 'Inquiry estimates updated')
  res.redirect('../case-details')
})

// Add your routes above the module.exports line
module.exports = router
