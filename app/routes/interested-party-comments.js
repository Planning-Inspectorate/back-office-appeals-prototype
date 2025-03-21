const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/main/appeals/:appealId/interested-party-comments', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let interestedPartyComments = appeal.interestedPartyComments

     // Desired status order
    const statusOrder = ["Ready to review", "Accepted", "Rejected", "Withdrawn"];

    // Sort based on desired status order
    interestedPartyComments = interestedPartyComments.sort((a, b) => {
        const statusA = a.status;
        const statusB = b.status;
        return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
    });

    let selectedStatusFilters = _.get(req.session.data.filters, 'statuses')
    let hasFilters = _.get(selectedStatusFilters, 'length')
    let selectedFilters = {
      categories: []
    }

    // the user has selected a status filter
    if(hasFilters) {
      interestedPartyComments = interestedPartyComments.filter(party => {
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
            href: `/main/appeals/${appeal.id}/interested-party-comments/remove-status/${label}`
          }
        })
      })
    }

    let pageSize = 25
    let pagination = new Pagination(interestedPartyComments, req.query.page, pageSize)
    interestedPartyComments = pagination.getData()

    res.render('/main/appeals/interested-party-comments/index', {
      appeal,
      interestedPartyComments,
      pagination,
      selectedFilters
    })
  })

  router.get('/main/appeals/:appealId/interested-party-comments/remove-status/:status', (req, res) => {
    _.set(req, 'session.data.filters.statuses', _.pull(req.session.data.filters.statuses, req.params.status))
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments`)
  })

  router.get('/main/appeals/:appealId/interested-party-comments/clear-filters', (req, res) => {
    _.set(req, 'session.data.filters.statuses', null)
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments`)
  })

}