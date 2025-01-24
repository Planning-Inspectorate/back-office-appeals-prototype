const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/main/cases', function (req, res) {

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
    let selectedCaseOfficerFilters = _.get(req.session.data.filters, 'caseOfficers')
    let selectedProcedureFilters = _.get(req.session.data.filters, 'procedures')
    let hasFilters = _.get(selectedStatusFilters, 'length') || _.get(selectedCaseOfficerFilters, 'length') || _.get(selectedProcedureFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      applications = applications.filter(application => {
        let matchesStatus = true
        let matchesCaseOfficer = true
        let matchesProcedure = true

        if(_.get(selectedStatusFilters, 'length')) {
          matchesStatus = selectedStatusFilters.includes(application.status);
        }

        if(_.get(selectedCaseOfficerFilters, 'length')) {
          matchesCaseOfficer = selectedCaseOfficerFilters.includes(application.caseOfficer);
        }

        if(_.get(selectedProcedureFilters, 'length')) {
          matchesProcedure = selectedProcedureFilters.includes(application.procedure);
        }

        return matchesStatus && matchesCaseOfficer && matchesProcedure
      })
    }

    if(_.get(selectedStatusFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Status' },
        items: selectedStatusFilters.map(label => {
          return {
            text: label,
            href: `/main/cases/remove-status/${label}`
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
            href: `/main/cases/remove-case-officer/${label}`
          }
        })
      })
    }

    if(_.get(selectedProcedureFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Procedure' },
        items: selectedProcedureFilters.map(label => {
          return {
            text: label,
            href: `/main/cases/remove-procedure/${label}`
          }
        })
      })
    }

    let totalApplications = applications.length
    let pageSize = 25
    let pagination = new Pagination(applications, req.query.page, pageSize)
    applications = pagination.getData()

    res.render('main/cases/all', {
      applications,
      selectedFilters,
      pagination,
      totalApplications
    })
  })

  router.get('/main/cases/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.statuses', null)
    _.set(req, 'session.data.filters.caseOfficers', null)
    _.set(req, 'session.data.filters.procedures', null)
    res.redirect('/main/cases')
  })

  router.get('/main/cases/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect('/main/cases')
  })

  router.get('/main/cases/remove-case-officer/:caseOfficer', (req, res) => {
    _.set(req, 'session.data.filters.caseOfficers', _.pull(req.session.data.filters.caseOfficers, req.params.caseOfficer))
    res.redirect('/main/cases')
  })

  router.get('/main/cases/remove-procedure/:procedure', (req, res) => {
    _.set(req, 'session.data.filters.procedures', _.pull(req.session.data.filters.procedures, req.params.procedure))
    res.redirect('/main/cases')
  })

  router.get('/main/cases/clear-search', (req, res) => {
    _.set(req, 'session.data.search.keywords', '')
    res.redirect('/main/cases')
  })


  router.get('/main/your-cases', function (req, res) {

    let applications = req.session.data.applications.filter(application => application.caseOfficer == 'Tony Stark')

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
    let selectedProcedureFilters = _.get(req.session.data.filters, 'procedures')
    let hasFilters = _.get(selectedStatusFilters, 'length') || _.get(selectedProcedureFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      applications = applications.filter(application => {
        let matchesStatus = true
        let matchesProcedure = true

        if(_.get(selectedStatusFilters, 'length')) {
          matchesStatus = selectedStatusFilters.includes(application.status);
        }

        if(_.get(selectedProcedureFilters, 'length')) {
          matchesProcedure = selectedProcedureFilters.includes(application.procedure);
        }

        return matchesStatus && matchesProcedure
      })
    }

    if(_.get(selectedStatusFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Status' },
        items: selectedStatusFilters.map(label => {
          return {
            text: label,
            href: `/main/cases/remove-status/${label}`
          }
        })
      })
    }

    if(_.get(selectedProcedureFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Procedure' },
        items: selectedProcedureFilters.map(label => {
          return {
            text: label,
            href: `/main/cases/remove-procedure/${label}`
          }
        })
      })
    }

    let totalApplications = applications.length
    let pageSize = 25
    let pagination = new Pagination(applications, req.query.page, pageSize)
    applications = pagination.getData()

    res.render('main/cases/index', {
      applications,
      selectedFilters,
      pagination,
      totalApplications
    })
  })

}