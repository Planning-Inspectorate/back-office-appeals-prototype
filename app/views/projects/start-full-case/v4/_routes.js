const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const { v4: uuidv4 } = require('uuid')

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

  if(req.session.data.appealProcedure == 'Written representations') {
    delete req.session.data.hearing
    delete req.session.data.hearingEstimates
    delete req.session.data.inquiry
    delete req.session.data.inquiryEstimates
  }

  if(req.session.data.appealProcedure == 'Hearing') {
    delete req.session.data.inquiry
    delete req.session.data.inquiryEstimates
  }

  if(req.session.data.appealProcedure == 'Inquiry') {
    delete req.session.data.hearing
    delete req.session.data.hearingEstimates
  }

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
  res.redirect('/projects/start-full-case/v4/add-inquiry/days')
})

router.post('/add-inquiry/days', function (req, res) {
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
  res.redirect('/projects/start-full-case/v4/edit-inquiry/days')
})

router.post('/edit-inquiry/days', function (req, res) {
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

//
// Rule 6 APPLICATIONS
//


router.get('/rule-6-applications', function (req, res) {
  let awaitingReview = req.session.data.rule6applications
    .filter((item) => item.status == 'Awaiting review')
    .sort((a, b) => {
      return new Date(b.dateAdded) - new Date(a.dateAdded)
    })
  let invited = req.session.data.rule6applications
    .filter((item) => item.status == 'Invited')
    .sort((a, b) => {
      return new Date(b.dateAdded) - new Date(a.dateAdded)
    })
  let accepted = req.session.data.rule6applications
    .filter((item) => item.status == 'Accepted')
    .sort((a, b) => {
      return new Date(b.dateAdded) - new Date(a.dateAdded)
    })
  let rejected = req.session.data.rule6applications
    .filter((item) => item.status == 'Rejected')
    .sort((a, b) => {
      return new Date(b.dateAdded) - new Date(a.dateAdded)
    })

  res.render('/projects/start-full-case/v4/rule-6-applications/index', {
    awaitingReview,
    invited,
    accepted,
    rejected
  })
})

//
// Rule 6 APPLICATIONS: ADD
//

router.post('/rule-6-applications/new', function (req, res) {
  res.redirect('./new/name')
})

router.post('/rule-6-applications/new/name', function (req, res) {
  res.redirect('./organisation')
})

router.post('/rule-6-applications/new/organisation', function (req, res) {
  res.redirect('./phone')
})

router.post('/rule-6-applications/new/phone', function (req, res) {
  res.redirect('./form')
})

router.post('/rule-6-applications/new/form', function (req, res) {
  res.redirect('./check')
})

router.post('/rule-6-applications/new/check', function (req, res) {
  console.log(req.session.data.rule6applications.length)
  let application = req.session.data.rule6application
  req.flash('success', 'Rule 6 status application added')
  req.session.data.rule6applications.push({
    id: uuidv4(),
    dateAdded: new Date(),
    emailAddress: application.emailAddress,
    firstName: application.firstName,
    lastName: application.lastName,
    hasOrganisation: application.hasOrganisation,
    organisationName: application.organisationName,
    phone: application.phone,
    status: 'Awaiting review'
  })
  res.redirect('/projects/start-full-case/v4/rule-6-applications')
})

// Add your routes above the module.exports line
module.exports = router
