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

router.get('/case-details', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00000005')
  res.render('/projects/start-full-case/v4/case-details', {
    application
  })
})

// temp fix until better organised
router.get('/appeals', function (req, res) {
  res.redirect('/projects/start-full-case/v4/')
})

router.get('/appeals/:appealId', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/index', {
    application
  })
})

router.get('/appeals/:appealId/appeal', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/appeal', {
    application
  })
})

router.get('/appeals/:appealId/questionnaire', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/questionnaire', {
    application
  })
})

router.get('/appeals/:appealId/statements', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  let rule6Statements = application.rule6Parties?.filter(party => party.statement)
  res.render('/projects/start-full-case/v4/show/statements', {
    application,
    rule6Statements
  })
})

router.get('/appeals/:appealId/ip-comments', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/ip-comments', {
    application
  })
})

router.get('/appeals/:appealId/final-comments', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/final-comments', {
    application
  })
})

router.get('/appeals/:appealId/site-visit', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/site-visit', {
    application
  })
})

router.get('/appeals/:appealId/notes', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/notes', {
    application
  })
})

router.get('/appeals/:appealId/activity', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/activity', {
    application
  })
})

router.get('/appeals/:appealId/documents', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/documents', {
    application
  })
})

router.get('/appeals/:appealId/hearing', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/hearing', {
    application
  })
})

router.get('/appeals/:appealId/inquiry', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == req.params.appealId)
  res.render('/projects/start-full-case/v4/show/inquiry', {
    application
  })
})

//
// CASE LIST
//

router.get('/', function (req, res) {

  let applications = req.session.data.appeals

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
  let selectedCaseOfficerFilters = _.get(req.session.data.filters, 'caseOfficers')
  let hasFilters = _.get(selectedStatusFilters, 'length') || _.get(selectedCaseOfficerFilters, 'length')

  let selectedFilters = {
    categories: []
  }

  // the user has selected a status filter
  if(hasFilters) {
    applications = applications.filter(application => {
      let matchesStatus = true
      let matchesCaseOfficer = true

      if(_.get(selectedStatusFilters, 'length')) {
        matchesStatus = selectedStatusFilters.includes(application.status);
      }

      if(_.get(selectedCaseOfficerFilters, 'length')) {
        matchesCaseOfficer = selectedCaseOfficerFilters.includes(application.caseOfficer);
      }


      return matchesStatus && matchesCaseOfficer
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

  if(_.get(selectedCaseOfficerFilters, 'length')) {
    selectedFilters.categories.push({
      heading: { text: 'Case officer' },
      items: selectedCaseOfficerFilters.map(label => {
        return {
          text: label,
          href: `/projects/start-full-case/v4/remove-case-officer/${label}`
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
  _.set(req, 'session.data.filters.caseOfficers', null)
  res.redirect('/projects/start-full-case/v4')
})

router.get('/remove-status/:status', (req, res) => {
  _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
  res.redirect('/projects/start-full-case/v4/')
})

router.get('/remove-case-officer/:caseOfficer', (req, res) => {
  _.set(req, 'session.data.filters.caseOfficers', _.pull(req.session.data.filters.caseOfficers, req.params.caseOfficer))
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
  let application = req.session.data.appeals.find(application => application.id == '00000005')
  application.status = 'Awaiting LPAQ'
  res.redirect('../case-details')
})

//
// APPEAL PROCEDURE: EDIT
//

router.post('/edit-procedure/check', function (req, res) {
  req.flash('success', 'Procedure updated')

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
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let rule6Parties = application.rule6Parties

  let awaitingReview = rule6Parties
    .filter((item) => item.status == 'Ready to review')
    .sort((a, b) => {
      return new Date(b.dateReceived) - new Date(a.dateReceived)
    })
  let approved = rule6Parties
    .filter((item) => item.status == 'Approved')
    .sort((a, b) => {
      return new Date(b.dateReceived) - new Date(a.dateReceived)
    })
  let rejected = rule6Parties
    .filter((item) => item.status == 'Rejected')
    .sort((a, b) => {
      return new Date(b.dateReceived) - new Date(a.dateReceived)
    })
  let withdrawn = rule6Parties
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
  let application = req.session.data.appeals.find(application => application.id == '00182182')
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
    status: 'Ready to review'
  }

  application.rule6Parties.push(newParty)
  res.redirect(`/projects/start-full-case/v4/rule-6-parties`)
})

//
// Rule 6 APPLICATIONS: EDIT
//

router.get('/rule-6-parties/:partyId/edit', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
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
  let application = req.session.data.appeals.find(application => application.id == '00182182')
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
  let application = req.session.data.appeals.find(application => application.id == '00182182')
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
  let application = req.session.data.appeals.find(application => application.id == '00182182')
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
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)
  res.render('/projects/start-full-case/v4/rule-6-parties/edit/form')
})

router.post('/rule-6-parties/:partyId/edit/form', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-parties/${req.params.partyId}/edit/check`)
})

router.get('/rule-6-parties/:partyId/edit/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)
  res.render('/projects/start-full-case/v4/rule-6-parties/edit/check', {
    party
  })
})

router.post('/rule-6-parties/:partyId/edit/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
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
// Rule 6 PARTIES: SHOW
//

router.get('/rule-6-parties/:id', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/show', {
    party
  })
})

//
// Rule 6 APPLICATIONS: APPROVE
//

router.get('/rule-6-parties/:id/approve', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/approve/index', {
    party
  })
})

router.post('/rule-6-parties/:id/approve', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  party.status = 'Approved'
  party.dateApproved = new Date()
  req.flash('success', 'Rule 6 status approved')
  res.redirect('/projects/start-full-case/v4/rule-6-parties/'+req.params.id)
})

//
// Rule 6 APPLICATIONS: REJECT
//

router.get('/rule-6-parties/:id/reject', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/reject/index', {
    party
  })
})

router.post('/rule-6-parties/:id/reject', function (req, res) {
  res.redirect('/projects/start-full-case/v4/rule-6-parties/'+req.params.id+'/reject/check')
})

router.get('/rule-6-parties/:id/reject/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/reject/check', {
    party
  })
})

router.post('/rule-6-parties/:id/reject/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
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
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/withdraw/index', {
    party
  })
})

router.post('/rule-6-parties/:id/withdraw', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  res.redirect('/projects/start-full-case/v4/rule-6-parties/'+req.params.id+'/withdraw/check')
})

router.get('/rule-6-parties/:id/withdraw/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-parties/withdraw/check', {
    party
  })
})

router.post('/rule-6-parties/:id/withdraw/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  if(party.status == 'Ready to review') {
    req.flash('success', 'Request for Rule 6 status withdrawn')
  } else {
    req.flash('success', 'Rule 6 status withdrawn')
  }
  party.status = 'Withdrawn'
  party.dateWithdrawn = new Date()
  res.redirect('/projects/start-full-case/v4/rule-6-parties/'+req.params.id)
})

//
// Rule 6 STATEMENTS
//

router.get('/rule-6-statements', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let rule6Statements = application.rule6Parties.filter((rule6Party) => rule6Party.statement)

  // let awaitingReview = rule6Statements
  //   .filter((item) => item.status == 'Ready to review')
  // let approved = rule6Statements
  //   .filter((item) => item.status == 'Accepted')
  // let rejected = rule6Statements
  //   .filter((item) => item.status == 'Rejected')

  // let statements = awaitingReview.concat(approved).concat(rejected)

  // Define the desired order of statuses
  const statusOrder = ["Ready to review", "Accepted", "Rejected"];

  // Sort the array based on the custom order
  statements = rule6Statements.sort((a, b) => {
      const statusA = a.statement.status;
      const statusB = b.statement.status;
      return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
  });

  res.render('/projects/start-full-case/v4/rule-6-statements/index', {
    statements
  })
})


//
// Rule 6 statements: ADD
//

router.get('/rule-6-statements/new', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-statements/new/organisation')
})

router.post('/rule-6-statements/new', function (req, res) {
  res.redirect('./new/name')
})

router.get('/rule-6-statements/new/name', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-statements/new/name')
})

router.post('/rule-6-statements/new/name', function (req, res) {
  res.redirect('./email-address')
})

router.get('/rule-6-statements/new/email-address', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-statements/new/email-address')
})

router.post('/rule-6-statements/new/email-address', function (req, res) {
  res.redirect('./phone')
})

router.get('/rule-6-statements/new/phone', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-statements/new/phone')
})

router.post('/rule-6-statements/new/phone', function (req, res) {
  res.redirect('./form')
})

router.get('/rule-6-statements/new/form', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-statements/new/form')
})

router.post('/rule-6-statements/new/form', function (req, res) {
  res.redirect('./check')
})

router.get('/rule-6-statements/new/check', function (req, res) {
  res.render('/projects/start-full-case/v4/rule-6-statements/new/check')
})

router.post('/rule-6-statements/new/check', function (req, res) {
  // let application = req.session.data.appeals.find(application => application.id == '00182182')
  // let party = req.session.data.rule6application
  // req.flash('success', 'Rule 6 party added')

  // let newParty = {
  //   id: uuidv4(),
  //   dateReceived: new Date(),
  //   emailAddress: party.emailAddress,
  //   firstName: party.firstName,
  //   lastName: party.lastName,
  //   hasOrganisation: party.hasOrganisation,
  //   organisationName: party.organisationName,
  //   phone: party.phone,
  //   status: 'Awaiting review'
  // }

  // application.rule6Parties.push(newParty)
  res.redirect(`/projects/start-full-case/v4/rule-6-statements`)
})

//
// Rule 6 statements: EDIT
//

router.get('/rule-6-statements/:partyId/edit', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)

  let hasOrganisation = _.get(req, 'session.data.editRule6Party.hasOrganisation') || party.hasOrganisation
  let organisationName = _.get(req, 'session.data.editRule6Party.organisationName')  || party.organisationName

  res.render('/projects/start-full-case/v4/rule-6-statements/edit/organisation', {
    hasOrganisation,
    organisationName
  })
})

router.post('/rule-6-statements/:partyId/edit', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-parties/${req.params.partyId}/edit/name`)
})

router.get('/rule-6-statements/:partyId/edit/name', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)

  let firstName = _.get(req, 'session.data.editRule6Party.firstName') || party.firstName
  let lastName = _.get(req, 'session.data.editRule6Party.lastName')  || party.lastName

  res.render('/projects/start-full-case/v4/rule-6-statements/edit/name', {
    firstName,
    lastName
  })
})

router.post('/rule-6-statements/:partyId/edit/name', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-statements/${req.params.partyId}/edit/email-address`)
})

router.get('/rule-6-statements/:partyId/edit/email-address', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)

  let emailAddress = _.get(req, 'session.data.editRule6Party.emailAddress')  || party.emailAddress

  res.render('/projects/start-full-case/v4/rule-6-statements/edit/email-address', {
    emailAddress
  })
})

router.post('/rule-6-statements/:partyId/edit/email-address', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-statements/${req.params.partyId}/edit/phone`)
})

router.get('/rule-6-statements/:partyId/edit/phone', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)

  let phone = _.get(req, 'session.data.editRule6Party.phone')  || party.phone


  res.render('/projects/start-full-case/v4/rule-6-statements/edit/phone', {
    phone
  })
})

router.post('/rule-6-statements/:partyId/edit/phone', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-statements/${req.params.partyId}/edit/form`)
})

router.get('/rule-6-statements/:partyId/edit/form', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)
  res.render('/projects/start-full-case/v4/rule-6-statements/edit/form')
})

router.post('/rule-6-statements/:partyId/edit/form', function (req, res) {
  res.redirect(`/projects/start-full-case/v4/rule-6-statements/${req.params.partyId}/edit/check`)
})

router.get('/rule-6-statements/:partyId/edit/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id === req.params.partyId)
  res.render('/projects/start-full-case/v4/rule-6-statements/edit/check', {
    party
  })
})

router.post('/rule-6-statements/:partyId/edit/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
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

  res.redirect(`/projects/start-full-case/v4/rule-6-statements/${req.params.partyId}`)

})


//
// Rule 6 statements: SHOW
//

router.get('/rule-6-statements/:id', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-statements/show', {
    party
  })
})

//
// Rule 6 statements: APPROVE
//

router.get('/rule-6-statements/:id/approve', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-statements/approve/index', {
    party
  })
})

router.post('/rule-6-statements/:id/approve', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  party.statement.status = 'Accepted'
  party.statement.dateApproved = new Date()
  req.flash('success', 'Rule 6 statement accepted')
  res.redirect('/projects/start-full-case/v4/rule-6-statements/'+req.params.id)
})

//
// Rule 6 statements: REJECT
//

router.get('/rule-6-statements/:id/reject', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-statements/reject/index', {
    party
  })
})

router.post('/rule-6-statements/:id/reject', function (req, res) {
  res.redirect('/projects/start-full-case/v4/rule-6-statements/'+req.params.id+'/reject/can-resubmit')
})

router.get('/rule-6-statements/:id/reject/can-resubmit', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-statements/reject/can-resubmit', {
    party
  })
})

router.post('/rule-6-statements/:id/reject/can-resubmit', function (req, res) {
  res.redirect('/projects/start-full-case/v4/rule-6-statements/'+req.params.id+'/reject/check')
})

router.get('/rule-6-statements/:id/reject/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-statements/reject/check', {
    party
  })
})

router.post('/rule-6-statements/:id/reject/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  party.statement.status = 'Rejected'
  party.statement.dateRejected = new Date()
  req.flash('success', 'Rule 6 statement rejected')
  res.redirect('/projects/start-full-case/v4/rule-6-statements/'+req.params.id)
})

//
// Rule 6 statements: redact and accept
//

router.get('/rule-6-statements/:id/redact', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-statements/redact/index', {
    party
  })
})

router.post('/rule-6-statements/:id/redact', function (req, res) {
  res.redirect('/projects/start-full-case/v4/rule-6-statements/'+req.params.id+'/redact/check')
})

router.get('/rule-6-statements/:id/redact/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-statements/redact/check', {
    party
  })
})

router.post('/rule-6-statements/:id/redact/check', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  party.statement.status = 'Accepted'
  party.statement.dateApproved = new Date()
  req.flash('success', 'Rule 6 statement accepted')
  res.redirect('/projects/start-full-case/v4/rule-6-statements/'+req.params.id)
})

//
// Rule 6 statements: WITHDRAW
//

router.get('/rule-6-statements/:id/withdraw', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)

  res.render('/projects/start-full-case/v4/rule-6-statements/withdraw/index', {
    party
  })
})

router.post('/rule-6-statements/:id/withdraw', function (req, res) {
  let application = req.session.data.appeals.find(application => application.id == '00182182')
  let party = application.rule6Parties.find(party => party.id == req.params.id)
  party.status = 'Withdrawn'
  party.dateWithdrawn = new Date()
  req.flash('success', 'Rule 6 status withdrawn')
  res.redirect('/projects/start-full-case/v4/rule-6-statements/'+req.params.id)
})

//
// Manage case teams
//

router.post('/team-email', function (req, res) {
  res.redirect('/projects/start-full-case/v4/team-email-case-officers')
})

router.post('/upload-doc', function (req, res) {
  res.redirect('doc-details')
})

// Add your routes above the module.exports line
module.exports = router
