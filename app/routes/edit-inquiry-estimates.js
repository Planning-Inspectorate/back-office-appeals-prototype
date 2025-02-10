const _ = require('lodash')

module.exports = router => {

  router.get('/main/cases/:caseId/edit-inquiry-estimates', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let estimatedPreparationTime = _.get(req, 'session.data.editInquiryEstimates.estimatedPreparationTime')  || _case.inquiryEstimates.estimatedPreparationTime
    let estimatedInquiryTime = _.get(req, 'session.data.editInquiryEstimates.estimatedInquiryTime')  || _case.inquiryEstimates.estimatedInquiryTime
    let estimatedReportingTime = _.get(req, 'session.data.editInquiryEstimates.estimatedReportingTime')  || _case.inquiryEstimates.estimatedReportingTime

    res.render('/main/cases/edit-inquiry-estimates/index', {
      _case,
      estimatedPreparationTime,
      estimatedInquiryTime,
      estimatedReportingTime
    })
  })

  router.post('/main/cases/:caseId/edit-inquiry-estimates', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-inquiry-estimates/check`)
  })

  router.get('/main/cases/:caseId/edit-inquiry-estimates/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-inquiry-estimates/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-inquiry-estimates/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    _case.inquiryEstimates = req.session.data.editInquiryEstimates
    req.flash('success', 'Inquiry estimates updated')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}