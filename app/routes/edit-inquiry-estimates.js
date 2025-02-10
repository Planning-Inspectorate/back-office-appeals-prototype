const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:appealId/edit-inquiry-estimates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let estimatedPreparationTime = _.get(req, 'session.data.editInquiryEstimates.estimatedPreparationTime')  || application.inquiryEstimates.estimatedPreparationTime
    let estimatedInquiryTime = _.get(req, 'session.data.editInquiryEstimates.estimatedInquiryTime')  || application.inquiryEstimates.estimatedInquiryTime
    let estimatedReportingTime = _.get(req, 'session.data.editInquiryEstimates.estimatedReportingTime')  || application.inquiryEstimates.estimatedReportingTime

    res.render('/main/cases/edit-inquiry-estimates/index', {
      application,
      estimatedPreparationTime,
      estimatedInquiryTime,
      estimatedReportingTime
    })
  })

  router.post('/main/cases/:appealId/edit-inquiry-estimates', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/edit-inquiry-estimates/check`)
  })

  router.get('/main/cases/:appealId/edit-inquiry-estimates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/edit-inquiry-estimates/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-inquiry-estimates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.inquiryEstimates = req.session.data.editInquiryEstimates
    req.flash('success', 'Inquiry estimates updated')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}