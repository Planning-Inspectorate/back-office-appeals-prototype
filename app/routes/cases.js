const _ = require('lodash')
const Pagination = require('../helpers/pagination')
const { getActions } = require('../helpers/actions')

module.exports = router => {

  router.get('/main/cases', function (req, res) {

    let cases = req.session.data.cases

    let keywords = _.get(req.session.data.search, 'keywords')

    if(keywords) {
      keywords = keywords.toLowerCase()
      cases = cases.filter(_case => {
        let reference = _case.id
        let name = (_case.appellant.firstName + ' ' + _case.appellant.lastName).toLowerCase()
        let postcode = _case.site.address.postcode.toLowerCase()
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
      cases = cases.filter(_case => {
        let matchesStatus = true
        let matchesCaseOfficer = true
        let matchesProcedure = true

        if(_.get(selectedStatusFilters, 'length')) {
          matchesStatus = selectedStatusFilters.includes(_case.status);
        }

        if(_.get(selectedCaseOfficerFilters, 'length')) {
          matchesCaseOfficer = selectedCaseOfficerFilters.includes(_case.caseOfficer);
        }

        if(_.get(selectedProcedureFilters, 'length')) {
          matchesProcedure = selectedProcedureFilters.includes(_case.procedure);
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

    let totalCases = cases.length
    let pageSize = 25
    let pagination = new Pagination(cases, req.query.page, pageSize)
    cases = pagination.getData()

    cases = cases.map(_case => ({
      ..._case,
      actions: getActions(_case)
    }));

    res.render('main/cases/all', {
      cases,
      selectedFilters,
      pagination,
      totalCases
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

  router.get('/main/cases/remove-site-visit/:siteVisit', (req, res) => {
    _.set(req, 'session.data.filters.siteVisit', _.pull(req.session.data.filters.siteVisit, req.params.siteVisit))
    res.redirect('/main/cases')
  })

  router.get('/main/cases/clear-search', (req, res) => {
    _.set(req, 'session.data.search.keywords', '')
    res.redirect('/main/cases')
  })


  router.get('/main/your-cases', function (req, res) {

    let cases = req.session.data.cases.filter(_case => _case.caseOfficer == 'Tony Stark')

    let keywords = _.get(req.session.data.search, 'keywords')

    if(keywords) {
      keywords = keywords.toLowerCase()
      cases = cases.filter(_case => {
        let reference = _case.id
        let name = (_case.appellant.firstName + ' ' + _case.appellant.lastName).toLowerCase()
        let postcode = _case.site.address.postcode.toLowerCase()
        return postcode.indexOf(keywords) > -1 || reference.indexOf(keywords) > -1 || name.indexOf(keywords) > -1
      })
    }

    let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
    let selectedProcedureFilters = _.get(req.session.data.filters, 'procedures')
    let selectedSiteVisitFilters = _.get(req.session.data.filters, 'siteVisit')
    let selectedPlanningObligationFilters = _.get(req.session.data.filters, 'planningObligation')
    let hasFilters = _.get(selectedStatusFilters, 'length') || _.get(selectedProcedureFilters, 'length') || _.get(selectedSiteVisitFilters, 'length') || _.get(selectedPlanningObligationFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      cases = cases.filter(_case => {
        let matchesStatus = true
        let matchesProcedure = true
        let matchesSiteVisit = true
        let matchesPlanningObligation = true

        if(_.get(selectedStatusFilters, 'length')) {
          matchesStatus = selectedStatusFilters.includes(_case.status);
        }

        if(_.get(selectedProcedureFilters, 'length')) {
          matchesProcedure = selectedProcedureFilters.includes(_case.procedure);
        }

        if(_.get(selectedSiteVisitFilters, 'length')) {
          matchesSiteVisit = false
          if(selectedSiteVisitFilters.includes('Site visit set up')) {
            if(_case.siteVisit) {
              matchesSiteVisit = true
            }
          }
          if(selectedSiteVisitFilters.includes('Site visit not set up')) {
            if(!_case.siteVisit) {
              matchesSiteVisit = true
            }
          }
        }

        if(_.get(selectedPlanningObligationFilters, 'length')) {
          matchesPlanningObligation = false
          if(selectedPlanningObligationFilters.includes('Has planning obligation')) {
            if(_case.appeal.hasPlanningObligation == 'Yes') {
              matchesPlanningObligation = true
            }
          }
          if(selectedPlanningObligationFilters.includes('Does not have planning obligation')) {
            if(_case.appeal.hasPlanningObligation == 'No') {
              matchesPlanningObligation = true
            }
          }
        }

        return matchesStatus && matchesProcedure && matchesSiteVisit && matchesPlanningObligation
      })
    }

    if(_.get(selectedStatusFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Status' },
        items: selectedStatusFilters.map(label => {
          return {
            text: label,
            href: `/main/your-cases/remove-status/${label}`
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
            href: `/main/your-cases/remove-procedure/${label}`
          }
        })
      })
    }

    if(_.get(selectedSiteVisitFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Site visit' },
        items: selectedSiteVisitFilters.map(label => {
          return {
            text: label,
            href: `/main/your-cases/remove-site-visit/${label}`
          }
        })
      })
    }

    if(_.get(selectedPlanningObligationFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Planning obligation' },
        items: selectedPlanningObligationFilters.map(label => {
          return {
            text: label,
            href: `/main/your-cases/remove-planning-obligation/${label}`
          }
        })
      })
    }

    let totalCases = cases.length
    let pageSize = 25
    let pagination = new Pagination(cases, req.query.page, pageSize)
    cases = pagination.getData()

    cases = cases.map(_case => ({
      ..._case,
      actions: getActions(_case)
    }));

    res.render('main/cases/index', {
      cases,
      selectedFilters,
      pagination,
      totalCases
    })
  })

  router.get('/main/your-cases/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect('/main/your-cases')
  })

  router.get('/main/your-cases/remove-case-officer/:caseOfficer', (req, res) => {
    _.set(req, 'session.data.filters.caseOfficers', _.pull(req.session.data.filters.caseOfficers, req.params.caseOfficer))
    res.redirect('/main/your-cases')
  })

  router.get('/main/your-cases/remove-procedure/:procedure', (req, res) => {
    _.set(req, 'session.data.filters.procedures', _.pull(req.session.data.filters.procedures, req.params.procedure))
    res.redirect('/main/your-cases')
  })

  router.get('/main/your-cases/remove-site-visit/:siteVisit', (req, res) => {
    _.set(req, 'session.data.filters.siteVisit', _.pull(req.session.data.filters.siteVisit, req.params.siteVisit))
    res.redirect('/main/your-cases')
  })

  router.get('/main/your-cases/remove-planning-obligation/:planningObligation', (req, res) => {
    _.set(req, 'session.data.filters.planningObligation', _.pull(req.session.data.filters.planningObligation, req.params.planningObligation))
    res.redirect('/main/your-cases')
  })

  router.get('/main/your-cases/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.statuses', null)
    _.set(req, 'session.data.filters.procedures', null)
    _.set(req, 'session.data.filters.siteVisit', null)
    _.set(req, 'session.data.filters.planningObligation', null)
    res.redirect('/main/your-cases')
  })

}