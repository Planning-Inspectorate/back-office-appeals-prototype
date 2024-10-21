const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/start-case/check', function (req, res) {
  req.flash('success', 'Case started')
  req.session.data['case-stage'] = 'questionnaire'
  res.redirect('../case-details')
})

router.post('/add-hearing-details', function (req, res) {
  res.redirect('/projects/start-s78-case/v1/add-hearing-details/has-time')
})

router.post('/add-hearing-details/has-time', function (req, res) {
  if(req.session.data.hearing.hasTime == 'Yes') {
    res.redirect('/projects/start-s78-case/v1/add-hearing-details/time')
  } else {
    res.redirect('/projects/start-s78-case/v1/add-hearing-details/has-address')
  }
})

router.post('/add-hearing-details/time', function (req, res) {
  res.redirect('/projects/start-s78-case/v1/add-hearing-details/has-address')
})

router.post('/add-hearing-details/has-address', function (req, res) {
  if(req.session.data.hearing.hasAddress == 'Yes') {
    res.redirect('/projects/start-s78-case/v1/add-hearing-details/address')
  } else {
    res.redirect('/projects/start-s78-case/v1/add-hearing-details/check')
  }
})

router.post('/add-hearing-details/address', function (req, res) {
  res.redirect('/projects/start-s78-case/v1/add-hearing-details/check')
})


router.post('/add-hearing-details/check', function (req, res) {
  req.flash('success', 'Hearing details added')
  res.redirect('../case-details')
})


router.post('/add-estimates', function (req, res) {
  res.redirect('./add-estimates/check')
})

router.post('/add-estimates/check', function (req, res) {
  req.flash('success', 'Hearing estimates added')
  res.redirect('../case-details')
})



// Add your routes above the module.exports line
module.exports = router
