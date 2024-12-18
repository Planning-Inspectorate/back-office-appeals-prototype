const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')
const Pagination = require('../../../../helpers/pagination')

//
// SETTING
//

router.get('/changeSetting', function (req, res) {
  if(req.query.procedure == 'Inquiry') {
    req.session.data.appealProcedure = 'Inquiry'
    req.session.data['case-stage'] = 'questionnaire'
  } else {
    req.session.data.appealProcedure = ''
    req.session.data['case-stage'] = ''
  }
  res.redirect('/projects/start-full-case/v4/case-details')
})

//
// CASE LIST
//

router.get('/', function (req, res) {

  let applications = req.session.data.applications

  let keywords = _.get(req.session.data.search, 'keywords')

  if(keywords) {
    keywords = keywords.toLowerCase()
    applications = applications.filter(application => {
      let reference = application.id
      let name = (application.appellant.firstName + ' ' + application.appellant.lastName).toLowerCase()
      let postcode = application.site.address.postcode.toLowerCase()
      return postcode.indexOf(keywords) > -1 || reference.indexOf(keywords) > -1 || name.indexOf(keywords) > -1
    })
  }


  let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
  let hasFilters = _.get(selectedStatusFilters, 'length')

  let selectedFilters = {
    categories: []
  }

  // the user has selected a status filter
  if(hasFilters) {
    applications = applications.filter(application => {
      let matchesStatus = true

      if(_.get(selectedStatusFilters, 'length')) {
        matchesStatus = selectedStatusFilters.includes(application.status);
      }

      return matchesStatus
    })
  }

  if(_.get(selectedStatusFilters, 'length')) {
    selectedFilters.categories.push({
      heading: { text: 'Status' },
      items: selectedStatusFilters.map(label => {
        return {
          text: label,
          href: `/projects/start-full-case/v4/remove-status/${label}`
        }
      })
    })
  }

  let totalApplications = applications.length
  let pageSize = 25
  let pagination = new Pagination(applications, req.query.page, pageSize)
  applications = pagination.getData()

  res.render('/projects/start-full-case/v4/index', {
    applications,
    selectedFilters,
    pagination,
    totalApplications
  })
})

router.get('/clear-filters', (req, res) => {
  _.set(req, 'session.data.filters.statuses', null)
  res.redirect('/projects/start-full-case/v4')
})

router.get('/remove-status/:status', (req, res) => {
  _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
  res.redirect('/projects/start-full-case/v4/')
})

router.get('/clear-search', (req, res) => {
  _.set(req, 'session.data.search.keywords', '')
  res.redirect('/projects/start-full-case/v4/')
})


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
// CMC: ADD
//

router.post('/add-cmc', function (req, res) {
  res.redirect('/projects/start-full-case/v4/add-cmc/check')
})

router.post('/add-cmc/check', function (req, res) {
  req.flash('success', 'Pre-inquiry meeting set up')
  res.redirect('../case-details')
})

//
// CMC: EDIT
//

router.post('/edit-cmc', function (req, res) {
  res.redirect('/projects/start-full-case/v4/edit-cmc/check')
})

router.post('/edit-cmc/check', function (req, res) {
  req.flash('success', 'Pre-inquiry meeting updated')
  res.redirect('../case-details')
})

//
// CMC: CANCEL
//

router.post('/cancel-cmc/', function (req, res) {
  req.flash('success', 'Pre-inquiry meeting cancelled')
  delete req.session.data.cmc
  res.redirect('/projects/start-full-case/v4/case-details')
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

router.get('/rule-6-parties', function (req, res) {
  let application = req.session.data.applications[0]
  let rule6Parties = application.rule6Parties

  let awaitingReview = application.rule6Parties
    .filter((item) => item.status == 'Awaiting review')
    .sort((a, b) => {
      return new Date(b.dateReceived) - new Date(a.dateReceived)
    })
  let approved = application.rule6Parties
    .filter((item) => item.status == 'Approved')
    .sort((a, b) => {
      return new Date(b.dateReceived) - new Date(a.dateReceived)
    })
  let rejected = application.rule6Parties
    .filter((item) => item.status == 'Rejected')
    .sort((a, b) => {
      return new Date(b.dateReceived) - new Date(a.dateReceived)
    })
  let withdrawn = application.rule6Parties
    .filter((item) => item.status == 'Withdrawn')
    .sort((a, b) => {
      return new Date(b.dateReceived) - new Date(a.dateReceived)
    })

  let parties = awaitingReview.concat(approved).concat(rejected).concat(withdrawn)

  let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
  let hasFilters = _.get(selectedStatusFilters, 'length')
  let selectedFilters = {
    categories: []
  }

  // the user has selected a status filter
  if(hasFilters) {
    parties = parties.filter(party => {
      let matchesStatus = true

      if(_.get(selectedStatusFilters, 'length')) {
        matchesStatus = selectedStatusFilters.includes(party.status);
      }

      return matchesStatus
    })
  }

  if(_.get(selectedStatusFilters, 'length')) {
    selectedFilters.categories.push({
      heading: { text: 'Status' },
      items: selectedStatusFilters.map(label => {
        return {
          text: label,
          href: `/projects/start-full-case/v4/rule-6-parties/remove-status/${label}`
        }
      })
    })
  }

  let pageSize = 25
  let pagination = new Pagination(parties, req.query.page, pageSize)
  parties = pagination.getData()

  res.render('/projects/start-full-case/v4/rule-6-parties/index', {
    parties,
    selectedFilters,
    pagination
  })
})

router.get('/rule-6-parties/remove-status/:status', (req, res) => {
  _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
  res.redirect('/projects/start-full-case/v4/rule-6-parties/')
})

router.get('/rule-6-parties/clear-filters', (req, res) => {
  _.set(req, 'session.data.filters.statuses', null)
  res.redirect('/projects/start-full-case/v4/rule-6-parties')
})

//
// Rule 6 APPLICATIONS: ADD
//

router.get('/rule-6-parties/new', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-parties/new/organisation')
})

router.post('/rule-6-parties/new', function (req, res) {
  res.redirect('./new/name')
})

router.get('/rule-6-parties/new/name', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-parties/new/name')
})

router.post('/rule-6-parties/new/name', function (req, res) {
  res.redirect('./email-address')
})

router.get('/rule-6-parties/new/email-address', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-parties/new/email-address')
})

router.post('/rule-6-parties/new/email-address', function (req, res) {
  res.redirect('./phone')
})

router.get('/rule-6-parties/new/phone', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-parties/new/phone')
})

router.post('/rule-6-parties/new/phone', function (req, res) {
  res.redirect('./form')
})

router.get('/rule-6-parties/new/form', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-parties/new/form')
})

router.post('/rule-6-parties/new/form', function (req, res) {
  res.redirect('./check')
})

router.get('/rule-6-parties/new/check', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-parties/new/check')
})

router.post('/rule-6-parties/new/check', function (req, res) {
  let application = req.session.data.applications[0]
  let party = req.session.data.rule6application
  req.flash('success', 'Rule 6 party added')

  let newParty = {
    id: uuidv4(),
    dateReceived: new Date(),
    emailAddress: party.emailAddress,
    firstName: party.firstName,
    lastName: party.lastName,
    hasOrganisation: party.hasOrganisation,
    organisationName: party.organisationName,
    phone: party.phone,
    status: 'Awaiting review'
  }

  application.rule6Parties.push(newParty)
  res.redirect(`/projects/start-full-case/v4/rule-6-parties`)
})

//
// Rule 6 APPLICATIONS: EDIT
//

router.get('/rule-6-parties/:partyId/edit', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)

  let hasOrganisation = _.get(req, 'session.data.editRule6Party.hasOrganisation') || party.hasOrganisation
  let organisationName = _.get(req, 'session.data.editRule6Party.organisationName')  || party.organisationName

  res.render('/projects/start-full-case/v4/rule-6-parties/edit/organisation', {
    hasOrganisation,
    organisationName
  })
})

router.post('/rule-6-parties/:partyId/edit', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-parties/${req.params.partyId}/edit/name`)
})

router.get('/rule-6-parties/:partyId/edit/name', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)

  let firstName = _.get(req, 'session.data.editRule6Party.firstName') || party.firstName
  let lastName = _.get(req, 'session.data.editRule6Party.lastName')  || party.lastName

  res.render('/projects/start-full-case/v4/rule-6-parties/edit/name', {
    firstName,
    lastName
  })
})

router.post('/rule-6-parties/:partyId/edit/name', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-parties/${req.params.partyId}/edit/email-address`)
})

router.get('/rule-6-parties/:partyId/edit/email-address', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)

  let emailAddress = _.get(req, 'session.data.editRule6Party.emailAddress')  || party.emailAddress

  res.render('/projects/start-full-case/v4/rule-6-parties/edit/email-address', {
    emailAddress
  })
})

router.post('/rule-6-parties/:partyId/edit/email-address', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-parties/${req.params.partyId}/edit/phone`)
})

router.get('/rule-6-parties/:partyId/edit/phone', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)

  let phone = _.get(req, 'session.data.editRule6Party.phone')  || party.phone


  res.render('/projects/start-full-case/v4/rule-6-parties/edit/phone', {
    phone
  })
})

router.post('/rule-6-parties/:partyId/edit/phone', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-parties/${req.params.partyId}/edit/form`)
})

router.get('/rule-6-parties/:partyId/edit/form', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)
  res.render('/projects/start-full-case/v4/rule-6-parties/edit/form')
})

router.post('/rule-6-parties/:partyId/edit/form', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-parties/${req.params.partyId}/edit/check`)
})

router.get('/rule-6-parties/:partyId/edit/check', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)
  res.render('/projects/start-full-case/v4/rule-6-parties/edit/check', {
    party
  })
})

router.post('/rule-6-parties/:partyId/edit/check', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)
  req.flash('success', 'Rule 6 party updated')

  // Update party
  party.hasOrganisation = req.session.data.editRule6Party.hasOrganisation
  if(party.hasOrganisation == 'Yes') {
    party.organisationName = req.session.data.editRule6Party.organisationName
  }
  party.firstName = req.session.data.editRule6Party.firstName
  party.lastName = req.session.data.editRule6Party.lastName
  party.lastName = req.session.data.editRule6Party.lastName
  party.emailAddress = req.session.data.editRule6Party.emailAddress
  party.phone = req.session.data.editRule6Party.phone

  // Clear temporary form data
  delete req.session.data.editRule6Party

  res.redirect(`/projects/start-full-case/v4/rule-6-parties/${req.params.partyId}`)

})


//
// Rule 6 APPLICATIONS: SHOW
//

router.get('/rule-6-parties/:id', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/show', {
    party
  })
})

//
// Rule 6 APPLICATIONS: APPROVE
//

router.get('/rule-6-parties/:id/approve', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/approve/index', {
    party
  })
})

router.post('/rule-6-parties/:id/approve', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  party.status = 'Approved'
  party.dateApproved = new Date()
  req.flash('success', 'Rule 6 party approved')
  res.redirect('/projects/start-full-case/v4/rule-6-parties/'+req.params.id)
})

//
// Rule 6 APPLICATIONS: REJECT
//

router.get('/rule-6-parties/:id/reject', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/reject/index', {
    party
  })
})

router.post('/rule-6-parties/:id/reject', function (req, res) {
  res.redirect('/projects/start-full-case/v4/rule-6-parties/'+req.params.id+'/reject/check')
})

router.get('/rule-6-parties/:id/reject/check', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/reject/check', {
    party
  })
})

router.post('/rule-6-parties/:id/reject/check', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  party.status = 'Rejected'
  party.dateRejected = new Date()
  req.flash('success', 'Rule 6 status rejected')
  res.redirect('/projects/start-full-case/v4/rule-6-parties/'+req.params.id)
})

//
// Rule 6 APPLICATIONS: WITHDRAW
//

router.get('/rule-6-parties/:id/withdraw', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/withdraw/index', {
    party
  })
})

router.post('/rule-6-parties/:id/withdraw', function (req, res) {
  let application = req.session.data.applications[0]
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  party.status = 'Withdrawn'
  party.dateWithdrawn = new Date()
  req.flash('success', 'Rule 6 party withdrawn')
  res.redirect('/projects/start-full-case/v4/rule-6-parties/'+req.params.id)
})

// Add your routes above the module.exports line
module.exports = router
