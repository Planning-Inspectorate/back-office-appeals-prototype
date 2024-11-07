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

router.post('/edit-procedure/check', function (req, res) {
  req.flash('success', 'Appeal procedure updated')
  res.redirect('../case-details')
})

//
// HEARING: ADD
//

router.post('/add-hearing', function (req, res) {
  res.redirect('/projects/start-full-case/v4/add-hearing/has-address')
})

router.post('/add-hearing/has-address', function (req, res) {
  if(req.session.data.hearing.hasAddress == 'Yes') {
    res.redirect('/projects/start-full-case/v4/add-hearing/address')
  } else {
    res.redirect('/projects/start-full-case/v4/add-hearing/check')
  }
})

router.post('/add-hearing/address', function (req, res) {
  res.redirect('/projects/start-full-case/v4/add-hearing/check')
})


router.post('/add-hearing/check', function (req, res) {
  req.flash('success', 'Hearing set up')
  res.redirect('../case-details')
})

//
// HEARING: EDIT
//

router.post('/edit-hearing', function (req, res) {
  res.redirect('/projects/start-full-case/v4/edit-hearing/has-address')
})

router.post('/edit-hearing/has-address', function (req, res) {
  if(req.session.data.hearing.hasAddress == 'Yes') {
    res.redirect('/projects/start-full-case/v4/edit-hearing/address')
  } else {
    res.redirect('/projects/start-full-case/v4/edit-hearing/check')
  }
})

router.post('/edit-hearing/address', function (req, res) {
  res.redirect('/projects/start-full-case/v4/edit-hearing/check')
})

router.post('/edit-hearing/check', function (req, res) {
  req.flash('success', 'Hearing updated')
  res.redirect('../case-details')
})

//
// HEARING: CANCEL
//

router.post('/cancel-hearing/', function (req, res) {
  req.flash('success', 'Hearing cancelled')
  delete req.session.data.hearing
  res.redirect('/projects/start-full-case/v4/case-details')
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

router.post('/add-inquiry', function (req, res) {
  res.redirect('/projects/start-full-case/v4/add-inquiry/has-address')
})


router.post('/add-inquiry/has-address', function (req, res) {
  if(req.session.data.inquiry.hasAddress == 'Yes') {
    res.redirect('/projects/start-full-case/v4/add-inquiry/address')
  } else {
    res.redirect('/projects/start-full-case/v4/add-inquiry/check')
  }
})

router.post('/add-inquiry/address', function (req, res) {
  res.redirect('/projects/start-full-case/v4/add-inquiry/check')
})


router.post('/add-inquiry/check', function (req, res) {
  req.flash('success', 'Inquiry set up')
  res.redirect('../case-details')
})

//
// INQUIRY: EDIT
//

router.post('/edit-inquiry', function (req, res) {
  res.redirect('/projects/start-full-case/v4/edit-inquiry/has-address')
})

router.post('/edit-inquiry/has-address', function (req, res) {
  if(req.session.data.inquiry.hasAddress == 'Yes') {
    res.redirect('/projects/start-full-case/v4/edit-inquiry/address')
  } else {
    res.redirect('/projects/start-full-case/v4/edit-inquiry/check')
  }
})

router.post('/edit-inquiry/address', function (req, res) {
  res.redirect('/projects/start-full-case/v4/edit-inquiry/check')
})

router.post('/edit-inquiry/check', function (req, res) {
  req.flash('success', 'Inquiry updated')
  res.redirect('../case-details')
})


//
// INQUIRY: CANCEL
//

router.post('/cancel-inquiry/', function (req, res) {
  req.flash('success', 'Inquiry cancelled')
  delete req.session.data.inquiry
  res.redirect('/projects/start-full-case/v4/case-details')
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
