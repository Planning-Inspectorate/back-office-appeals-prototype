const _ = require('lodash')
const Pagination = require('../helpers/pagination')

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-parties', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let rule6Parties = appeal.rule6Parties

    let active = rule6Parties
      .filter((item) => item.status == 'Active')
      .sort((a, b) => {
        return new Date(b.dateAdded) - new Date(a.dateAdded)
      })
    

    let withdrawn = rule6Parties
      .filter((item) => item.status == 'Withdrawn')
      .sort((a, b) => {
        return new Date(b.dateAdded) - new Date(a.dateAdded)
      })

    let parties = active.concat(withdrawn)

    res.render('/main/appeals/rule-6-parties/index', {
      appeal,
      parties
    })
  })

}