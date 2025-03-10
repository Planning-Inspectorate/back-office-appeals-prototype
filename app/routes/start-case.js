const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/cases/:caseId/start-case', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    if(_case.type == 'Householder appeal') {
      res.redirect(`/main/cases/${req.params.caseId}/start-case/confirm`)
    }
    else {
      res.render('/main/cases/start-case/index', {
        _case
      })
    }
  })

  router.post('/main/cases/:caseId/start-case', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    if(req.session.data.startCase.procedure === 'Inquiry') {
      res.redirect(`/main/cases/${req.params.caseId}/start-case/inquiry-date`)
    } else {
      res.redirect(`/main/cases/${req.params.caseId}/start-case/check`)
    }
  })

  // router.get('/main/cases/:caseId/start-case/has-inquiry', function (req, res) {
  //   let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
  //   res.render('/main/cases/start-case/has-inquiry', {
  //     _case
  //   })
  // })

  // router.post('/main/cases/:caseId/start-case/has-inquiry', function (req, res) {
  //   if(req.session.data.startCase.hasInquiry == 'Yes') {
  //     res.redirect(`/main/cases/${req.params.caseId}/start-case/inquiry-date`)
  //   } else {
  //     res.redirect(`/main/cases/${req.params.caseId}/start-case/timetable-due-dates`)
  //   }
  // })

  router.get('/main/cases/:caseId/start-case/inquiry-date', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/start-case/inquiry-date', {
      _case
    })
  })

  router.post('/main/cases/:caseId/start-case/inquiry-date', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/start-case/inquiry-days`)
  })

  router.get('/main/cases/:caseId/start-case/inquiry-days', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/start-case/inquiry-days', {
      _case
    })
  })

  router.post('/main/cases/:caseId/start-case/inquiry-days', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/start-case/has-inquiry-address`)
  })

router.get('/main/cases/:caseId/start-case/has-inquiry-address', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
  res.render('/main/cases/start-case/has-inquiry-address', {
      _case
    })
  })

  router.post('/main/cases/:caseId/start-case/has-inquiry-address', function (req, res) {
    if(req.session.data.startCase.hasInquiryAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.caseId}/start-case/inquiry-address`)
    } else {
      res.redirect(`/main/cases/${req.params.caseId}/start-case/timetable-due-dates`)
    }
  })

  router.get('/main/cases/:caseId/start-case/inquiry-address', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/start-case/inquiry-address', {
      _case
    })
  })

  router.post('/main/cases/:caseId/start-case/inquiry-address', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/start-case/timetable-due-dates`)
  })

  router.get('/main/cases/:caseId/start-case/timetable-due-dates', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/start-case/timetable-due-dates', {
      _case
    })
  })

  router.post('/main/cases/:caseId/start-case/timetable-due-dates', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/start-case/check`)
  })

  router.get('/main/cases/:caseId/start-case/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/start-case/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/start-case/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    let data = req.session.data.startCase

    if(data.procedure === 'Written representations') {
      _case.LPAQuestionnaireDueDate = DateTime.now().toISO()
      _case.statementsDueDate = DateTime.now().toISO()
      _case.interestedPartyCommentsDueDate = DateTime.now().toISO()
      _case.finalCommentsDueDate = DateTime.now().toISO()
      if(_case.appeal.hasPlanningObligation == 'Yes' && _case.appeal.readyToSubmitPlanningObligation == 'No') {
        _case.planningObligationDueDate = DateTime.now().toISO()
      }
    }

    if(data.procedure === 'Hearing') {
      _case.LPAQuestionnaireDueDate = DateTime.now().toISO()
      _case.statementsDueDate = DateTime.now().toISO()
      _case.interestedPartyCommentsDueDate = DateTime.now().toISO()
      _case.statementOfCommonGroundDueDate = DateTime.now().toISO()
      if(_case.appeal.hasPlanningObligation == 'Yes' && _case.appeal.readyToSubmitPlanningObligation == 'No') {
        _case.planningObligationDueDate = DateTime.now().toISO()
      }
    }

    if(data.procedure === 'Inquiry') {
      _case.inquiry = {}
      _case.inquiry.date = DateTime.fromObject({
        day: data.inquiryDate.day,
        month: data.inquiryDate.month,
        year: data.inquiryDate.year
      }).toISO()
      _case.inquiry.time = data.inquiryTime
      _case.inquiry.hasDays = data.hasInquiryDays
      _case.inquiry.days = data.inquiryDays
      _case.inquiry.hasAddress = data.hasInquiryAddress
      _case.inquiry.address = data.inquiryAddress

      _case.LPAQuestionnaireDueDate = DateTime.fromObject({
        day: data.LPAQuestionnaireDueDate.day,
        month: data.LPAQuestionnaireDueDate.month,
        year: data.LPAQuestionnaireDueDate.year
      }).toISO()

      _case.statementsDueDate = DateTime.fromObject({
        day: data.statementsDueDate.day,
        month: data.statementsDueDate.month,
        year: data.statementsDueDate.year
      }).toISO()

      _case.interestedPartyCommentsDueDate = DateTime.fromObject({
        day: data.interestedPartyCommentsDueDate.day,
        month: data.interestedPartyCommentsDueDate.month,
        year: data.interestedPartyCommentsDueDate.year
      }).toISO()

      _case.statementOfCommonGroundDueDate = DateTime.fromObject({
        day: data.statementOfCommonGroundDueDate.day,
        month: data.statementOfCommonGroundDueDate.month,
        year: data.statementOfCommonGroundDueDate.year
      }).toISO()

      _case.proofOfEvidenceAndWitnessesDueDate = DateTime.fromObject({
        day: data.proofOfEvidenceAndWitnessesDueDate.day,
        month: data.proofOfEvidenceAndWitnessesDueDate.month,
        year: data.proofOfEvidenceAndWitnessesDueDate.year
      }).toISO()

      if(_case.appeal.hasPlanningObligation == 'Yes' && _case.appeal.readyToSubmitPlanningObligation == 'No') {
        _case.planningObligationDueDate = DateTime.fromObject({
          day: data.planningObligationDueDate.day,
          month: data.planningObligationDueDate.month,
          year: data.planningObligationDueDate.year
        }).toISO()
      }
    }

    _case.status = 'Awaiting LPAQ'
    _case.procedure = data.procedure
    _case.startDate = new Date()

    req.flash('success', 'Case started')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

  router.get('/main/cases/:caseId/start-case/confirm', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    res.render('/main/cases/start-case/confirm', {
      _case
    })

  })

  router.post('/main/cases/:caseId/start-case/confirm', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    _case.status = 'Awaiting LPAQ'
    req.flash('success', 'Case started')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}