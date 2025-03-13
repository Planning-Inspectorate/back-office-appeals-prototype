const _ = require('lodash')
const Pagination = require('../helpers/pagination')
const { getActions } = require('../helpers/actions')

module.exports = router => {

  router.get('/main/appeals', function (req, res) {

    let cases = req.session.data.appeals

    let keywords = _.get(req.session.data.search, 'keywords')

    if(keywords) {
      keywords = keywords.toLowerCase()
      cases = cases.filter(appeal => {
        let reference = appeal.id
        let name = (appeal.appellant.firstName + ' ' + appeal.appellant.lastName).toLowerCase()
        let postcode = appeal.site.address.postcode.toLowerCase()
        return postcode.indexOf(keywords) > -1 || reference.indexOf(keywords) > -1 || name.indexOf(keywords) > -1
      })
    }


    let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
    let selectedCaseOfficerFilters = _.get(req.session.data.filters, 'caseOfficers')
    let selectedTypeFilters = _.get(req.session.data.filters, 'types')
    let selectedProcedureFilters = _.get(req.session.data.filters, 'procedures')
    let hasFilters = _.get(selectedStatusFilters, 'length') || _.get(selectedCaseOfficerFilters, 'length') || _.get(selectedTypeFilters, 'length') || _.get(selectedProcedureFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      cases = cases.filter(appeal => {
        let matchesStatus = true
        let matchesCaseOfficer = true
        let matchesType = true
        let matchesProcedure = true

        if(_.get(selectedStatusFilters, 'length')) {
          matchesStatus = selectedStatusFilters.includes(appeal.status);
        }

        if(_.get(selectedCaseOfficerFilters, 'length')) {
          matchesCaseOfficer = selectedCaseOfficerFilters.includes(appeal.caseOfficer);
        }

        if(_.get(selectedTypeFilters, 'length')) {
          matchesType = selectedTypeFilters.includes(appeal.type);
        }

        if(_.get(selectedProcedureFilters, 'length')) {
          matchesProcedure = selectedProcedureFilters.includes(appeal.procedure);
        }

        return matchesStatus && matchesCaseOfficer && matchesType && matchesProcedure
      })
    }

    if(_.get(selectedStatusFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Status' },
        items: selectedStatusFilters.map(label => {
          return {
            text: label,
            href: `/main/appeals/remove-status/${label}`
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
            href: `/main/appeals/remove-case-officer/${label}`
          }
        })
      })
    }

    if(_.get(selectedTypeFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Type' },
        items: selectedTypeFilters.map(label => {
          return {
            text: label,
            href: `/main/appeals/remove-type/${label}`
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
            href: `/main/appeals/remove-procedure/${label}`
          }
        })
      })
    }

    let totalAppeals = cases.length
    let pageSize = 25
    let pagination = new Pagination(cases, req.query.page, pageSize)
    cases = pagination.getData()

    cases = cases.map(appeal => ({
      ...appeal,
      actions: getActions(appeal)
    }));

    res.render('main/appeals/all', {
      cases,
      selectedFilters,
      pagination,
      totalAppeals
    })
  })

  router.get('/main/appeals/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.statuses', null)
    _.set(req, 'session.data.filters.caseOfficers', null)
    _.set(req, 'session.data.filters.types', null)
    _.set(req, 'session.data.filters.procedures', null)
    res.redirect('/main/appeals')
  })

  router.get('/main/appeals/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect('/main/appeals')
  })

  router.get('/main/appeals/remove-case-officer/:caseOfficer', (req, res) => {
    _.set(req, 'session.data.filters.caseOfficers', _.pull(req.session.data.filters.caseOfficers, req.params.caseOfficer))
    res.redirect('/main/appeals')
  })

  router.get('/main/appeals/remove-type/:type', (req, res) => {
    _.set(req, 'session.data.filters.types', _.pull(req.session.data.filters.types, req.params.type))
    res.redirect('/main/appeals')
  })

  router.get('/main/appeals/remove-procedure/:procedure', (req, res) => {
    _.set(req, 'session.data.filters.procedures', _.pull(req.session.data.filters.procedures, req.params.procedure))
    res.redirect('/main/appeals')
  })

  router.get('/main/appeals/remove-site-visit/:siteVisit', (req, res) => {
    _.set(req, 'session.data.filters.siteVisit', _.pull(req.session.data.filters.siteVisit, req.params.siteVisit))
    res.redirect('/main/appeals')
  })

  router.get('/main/appeals/clear-search', (req, res) => {
    _.set(req, 'session.data.search.keywords', '')
    res.redirect('/main/appeals')
  })


  router.get('/main/your-appeals', function (req, res) {

    let cases = req.session.data.appeals.filter(appeal => appeal.caseOfficer == 'Tony Stark')

    let keywords = _.get(req.session.data.search, 'keywords')

    if(keywords) {
      keywords = keywords.toLowerCase()
      cases = cases.filter(appeal => {
        let reference = appeal.id
        let name = (appeal.appellant.firstName + ' ' + appeal.appellant.lastName).toLowerCase()
        let postcode = appeal.site.address.postcode.toLowerCase()
        return postcode.indexOf(keywords) > -1 || reference.indexOf(keywords) > -1 || name.indexOf(keywords) > -1
      })
    }

    let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
    let selectedProcedureFilters = _.get(req.session.data.filters, 'procedures')
    let selectedTypeFilters = _.get(req.session.data.filters, 'types')
    let selectedSiteVisitFilters = _.get(req.session.data.filters, 'siteVisit')
    let selectedPlanningObligationFilters = _.get(req.session.data.filters, 'planningObligation')
    let hasFilters = _.get(selectedStatusFilters, 'length') || _.get(selectedProcedureFilters, 'length') || _.get(selectedTypeFilters, 'length') || _.get(selectedSiteVisitFilters, 'length') || _.get(selectedPlanningObligationFilters, 'length')

    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      cases = cases.filter(appeal => {
        let matchesStatus = true
        let matchesType = true
        let matchesProcedure = true
        let matchesSiteVisit = true
        let matchesPlanningObligation = true

        if(_.get(selectedStatusFilters, 'length')) {
          matchesStatus = selectedStatusFilters.includes(appeal.status);
        }

        if(_.get(selectedTypeFilters, 'length')) {
          matchesType = selectedTypeFilters.includes(appeal.type);
        }

        if(_.get(selectedProcedureFilters, 'length')) {
          matchesProcedure = selectedProcedureFilters.includes(appeal.procedure);
        }

        if(_.get(selectedSiteVisitFilters, 'length')) {
          matchesSiteVisit = false
          if(selectedSiteVisitFilters.includes('Site visit set up')) {
            if(appeal.siteVisit) {
              matchesSiteVisit = true
            }
          }
          if(selectedSiteVisitFilters.includes('Site visit not set up')) {
            if(!appeal.siteVisit) {
              matchesSiteVisit = true
            }
          }
        }

        if(_.get(selectedPlanningObligationFilters, 'length')) {
          matchesPlanningObligation = false
          if(selectedPlanningObligationFilters.includes('Has planning obligation')) {
            if(appeal.appealForm.hasPlanningObligation == 'Yes') {
              matchesPlanningObligation = true
            }
          }
          if(selectedPlanningObligationFilters.includes('Does not have planning obligation')) {
            if(appeal.appealForm.hasPlanningObligation == 'No') {
              matchesPlanningObligation = true
            }
          }
        }

        return matchesStatus && matchesType && matchesProcedure && matchesSiteVisit && matchesPlanningObligation
      })
    }

    if(_.get(selectedStatusFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Status' },
        items: selectedStatusFilters.map(label => {
          return {
            text: label,
            href: `/main/your-appeals/remove-status/${label}`
          }
        })
      })
    }

    if(_.get(selectedTypeFilters, 'length')) {
      selectedFilters.categories.push({
        heading: { text: 'Type' },
        items: selectedTypeFilters.map(label => {
          return {
            text: label,
            href: `/main/your-appeals/remove-type/${label}`
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
            href: `/main/your-appeals/remove-procedure/${label}`
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
            href: `/main/your-appeals/remove-site-visit/${label}`
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
            href: `/main/your-appeals/remove-planning-obligation/${label}`
          }
        })
      })
    }

    let totalAppeals = cases.length
    let pageSize = 25
    let pagination = new Pagination(cases, req.query.page, pageSize)
    cases = pagination.getData()

    cases = cases.map(appeal => ({
      ...appeal,
      actions: getActions(appeal)
    }));

    res.render('main/appeals/index', {
      cases,
      selectedFilters,
      pagination,
      totalAppeals
    })
  })

  router.get('/main/your-appeals/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect('/main/your-appeals')
  })

  router.get('/main/your-appeals/remove-case-officer/:caseOfficer', (req, res) => {
    _.set(req, 'session.data.filters.caseOfficers', _.pull(req.session.data.filters.caseOfficers, req.params.caseOfficer))
    res.redirect('/main/your-appeals')
  })

  router.get('/main/your-appeals/remove-type/:type', (req, res) => {
    _.set(req, 'session.data.filters.types', _.pull(req.session.data.filters.types, req.params.type))
    res.redirect('/main/your-appeals')
  })

  router.get('/main/your-appeals/remove-procedure/:procedure', (req, res) => {
    _.set(req, 'session.data.filters.procedures', _.pull(req.session.data.filters.procedures, req.params.procedure))
    res.redirect('/main/your-appeals')
  })

  router.get('/main/your-appeals/remove-site-visit/:siteVisit', (req, res) => {
    _.set(req, 'session.data.filters.siteVisit', _.pull(req.session.data.filters.siteVisit, req.params.siteVisit))
    res.redirect('/main/your-appeals')
  })

  router.get('/main/your-appeals/remove-planning-obligation/:planningObligation', (req, res) => {
    _.set(req, 'session.data.filters.planningObligation', _.pull(req.session.data.filters.planningObligation, req.params.planningObligation))
    res.redirect('/main/your-appeals')
  })

  router.get('/main/your-appeals/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.statuses', null)
    _.set(req, 'session.data.filters.types', null)
    _.set(req, 'session.data.filters.procedures', null)
    _.set(req, 'session.data.filters.siteVisit', null)
    _.set(req, 'session.data.filters.planningObligation', null)
    res.redirect('/main/your-appeals')
  })

}