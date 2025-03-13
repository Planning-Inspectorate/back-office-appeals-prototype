const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/edit-inquiry-estimates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let estimatedPreparationTime = _.get(req, 'session.data.editInquiryEstimates.estimatedPreparationTime')  || appeal.inquiryEstimates.estimatedPreparationTime
    let estimatedInquiryTime = _.get(req, 'session.data.editInquiryEstimates.estimatedInquiryTime')  || appeal.inquiryEstimates.estimatedInquiryTime
    let estimatedReportingTime = _.get(req, 'session.data.editInquiryEstimates.estimatedReportingTime')  || appeal.inquiryEstimates.estimatedReportingTime

    res.render('/main/appeals/edit-inquiry-estimates/index', {
      appeal,
      estimatedPreparationTime,
      estimatedInquiryTime,
      estimatedReportingTime
    })
  })

  router.post('/main/appeals/:appealId/edit-inquiry-estimates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-inquiry-estimates/check`)
  })

  router.get('/main/appeals/:appealId/edit-inquiry-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-inquiry-estimates/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-inquiry-estimates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.inquiryEstimates = req.session.data.editInquiryEstimates
    req.flash('success', 'Inquiry estimates updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}