const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/edit-hearing-estimates', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let estimatedPreparationTime = _.get(req, 'session.data.editHearingEstimates.estimatedPreparationTime')  || _case.hearingEstimates.estimatedPreparationTime
    let estimatedHearingTime = _.get(req, 'session.data.editHearingEstimates.estimatedHearingTime')  || _case.hearingEstimates.estimatedHearingTime
    let estimatedReportingTime = _.get(req, 'session.data.editHearingEstimates.estimatedReportingTime')  || _case.hearingEstimates.estimatedReportingTime

    res.render('/main/cases/edit-hearing-estimates/index', {
      _case,
      estimatedPreparationTime,
      estimatedHearingTime,
      estimatedReportingTime
    })
  })

  router.post('/main/cases/:caseId/edit-hearing-estimates', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-hearing-estimates/check`)
  })

  router.get('/main/cases/:caseId/edit-hearing-estimates/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-hearing-estimates/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-hearing-estimates/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    _case.hearingEstimates = req.session.data.editHearingEstimates
    req.flash('success', 'Hearing estimates updated')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}