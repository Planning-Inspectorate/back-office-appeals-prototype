const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-parties', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
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

    // let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
    // let hasFilters = _.get(selectedStatusFilters, 'length')
    // let selectedFilters = {
    //   categories: []
    // }

    // // the user has selected a status filter
    // if(hasFilters) {
    //   parties = parties.filter(party => {
    //     let matchesStatus = true

    //     if(_.get(selectedStatusFilters, 'length')) {
    //       matchesStatus = selectedStatusFilters.includes(party.status);
    //     }

    //     return matchesStatus
    //   })
    // }

    // if(_.get(selectedStatusFilters, 'length')) {
    //   selectedFilters.categories.push({
    //     heading: { text: 'Status' },
    //     items: selectedStatusFilters.map(label => {
    //       return {
    //         text: label,
    //         href: `/main/cases/${application.id}/rule-6-parties/remove-status/${label}`
    //       }
    //     })
    //   })
    // }

    // let pageSize = 25
    // let pagination = new Pagination(parties, req.query.page, pageSize)
    // parties = pagination.getData()

    res.render('/main/cases/rule-6-parties/index', {
      application,
      parties
    })
  })

}