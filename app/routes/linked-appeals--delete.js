const _ = require('lodash')
const { isLeadAppeal } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/cases/:caseId/linked-appeals/:linkedAppealId/delete', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/linked-appeals/delete/index', {
      _case,
      linkedAppealId: req.params.linkedAppealId
    })
  })

  router.post('/main/cases/:caseId/linked-appeals/:linkedAppealId/delete', function (req, res) {
    // TODO: must remove where lead is lead and child is child otherwise it removes them all - naughty
    if(isLeadAppeal(req.params.linkedAppealId, req.session.data.linkedAppeals)) {
      _.remove(req.session.data.linkedAppeals, linkedAppeal => linkedAppeal.leadAppealId == req.params.linkedAppealId)
    } else {
      _.remove(req.session.data.linkedAppeals, linkedAppeal => linkedAppeal.childAppealId == req.params.linkedAppealId)
    }

    req.flash('success', 'Linked appeal removed')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}