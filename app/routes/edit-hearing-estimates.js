const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:caseId/edit-hearing-estimates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)

    let estimatedPreparationTime = _.get(req, 'session.data.editHearingEstimates.estimatedPreparationTime')  || appeal.hearingEstimates.estimatedPreparationTime
    let estimatedHearingTime = _.get(req, 'session.data.editHearingEstimates.estimatedHearingTime')  || appeal.hearingEstimates.estimatedHearingTime
    let estimatedReportingTime = _.get(req, 'session.data.editHearingEstimates.estimatedReportingTime')  || appeal.hearingEstimates.estimatedReportingTime

    res.render('/main/appeals/edit-hearing-estimates/index', {
      appeal,
      estimatedPreparationTime,
      estimatedHearingTime,
      estimatedReportingTime
    })
  })

  router.post('/main/appeals/:caseId/edit-hearing-estimates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.caseId}/edit-hearing-estimates/check`)
  })

  router.get('/main/appeals/:caseId/edit-hearing-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/edit-hearing-estimates/check', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/edit-hearing-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    appeal.hearingEstimates = req.session.data.editHearingEstimates
    req.flash('success', 'Hearing estimates updated')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}