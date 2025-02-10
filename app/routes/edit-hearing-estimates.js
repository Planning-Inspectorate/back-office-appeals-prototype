const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/edit-hearing-estimates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let estimatedPreparationTime = _.get(req, 'session.data.editHearingEstimates.estimatedPreparationTime')  || application.hearingEstimates.estimatedPreparationTime
    let estimatedHearingTime = _.get(req, 'session.data.editHearingEstimates.estimatedHearingTime')  || application.hearingEstimates.estimatedHearingTime
    let estimatedReportingTime = _.get(req, 'session.data.editHearingEstimates.estimatedReportingTime')  || application.hearingEstimates.estimatedReportingTime

    res.render('/main/cases/edit-hearing-estimates/index', {
      application,
      estimatedPreparationTime,
      estimatedHearingTime,
      estimatedReportingTime
    })
  })

  router.post('/main/cases/:appealId/edit-hearing-estimates', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/edit-hearing-estimates/check`)
  })

  router.get('/main/cases/:appealId/edit-hearing-estimates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/edit-hearing-estimates/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-hearing-estimates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.hearingEstimates = req.session.data.editHearingEstimates
    req.flash('success', 'Hearing estimates updated')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}