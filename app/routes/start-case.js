const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/start-case', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    if(appeal.type == 'Householder appeal' || appeal.type == 'CAS adverts' || appeal.type == 'CAS planning') {
      res.redirect(`/main/appeals/${req.params.appealId}/start-case/confirm`)
    }
    else {
      res.render('/main/appeals/start-case/index', {
        appeal
      })
    }
  })

  router.post('/main/appeals/:appealId/start-case', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    if(req.session.data.startCase.procedure === 'Inquiry') {
      res.redirect(`/main/appeals/${req.params.appealId}/start-case/inquiry-date`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/start-case/check`)
    }
  })

  router.get('/main/appeals/:appealId/start-case/inquiry-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/start-case/inquiry-date', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/start-case/inquiry-date', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/start-case/inquiry-days`)
  })

  router.get('/main/appeals/:appealId/start-case/inquiry-days', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/start-case/inquiry-days', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/start-case/inquiry-days', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/start-case/has-inquiry-address`)
  })

router.get('/main/appeals/:appealId/start-case/has-inquiry-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
  res.render('/main/appeals/start-case/has-inquiry-address', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/start-case/has-inquiry-address', function (req, res) {
    if(req.session.data.startCase.hasInquiryAddress == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/start-case/inquiry-address`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/start-case/timetable-due-dates`)
    }
  })

  router.get('/main/appeals/:appealId/start-case/inquiry-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/start-case/inquiry-address', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/start-case/inquiry-address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/start-case/timetable-due-dates`)
  })

  router.get('/main/appeals/:appealId/start-case/timetable-due-dates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/start-case/timetable-due-dates', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/start-case/timetable-due-dates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/start-case/check`)
  })

  router.get('/main/appeals/:appealId/start-case/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/start-case/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/start-case/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let data = req.session.data.startCase

    if(data.procedure === 'Written representations') {
      appeal.LPAQuestionnaireDueDate = DateTime.now().toISO()
      appeal.statementsDueDate = DateTime.now().toISO()
      appeal.interestedPartyCommentsDueDate = DateTime.now().toISO()
      appeal.finalCommentsDueDate = DateTime.now().toISO()
      if(appeal.appealForm.hasPlanningObligation == 'Yes' && appeal.appealForm.readyToSubmitPlanningObligation == 'No') {
        appeal.planningObligationDueDate = DateTime.now().toISO()
      }
    }

    if(data.procedure === 'Hearing') {
      appeal.LPAQuestionnaireDueDate = DateTime.now().toISO()
      appeal.statementsDueDate = DateTime.now().toISO()
      appeal.interestedPartyCommentsDueDate = DateTime.now().toISO()
      appeal.statementOfCommonGroundDueDate = DateTime.now().toISO()
      // if(appeal.appealForm.hasPlanningObligation == 'Yes' && appeal.appealForm.readyToSubmitPlanningObligation == 'No') {
      //   appeal.planningObligationDueDate = DateTime.now().toISO()
      // }
    }

    if(data.procedure === 'Inquiry') {
      appeal.inquiry = {}
      appeal.inquiry.date = DateTime.fromObject({
        day: data.inquiryDate.day,
        month: data.inquiryDate.month,
        year: data.inquiryDate.year,
        hour: data.inquiryTime.hour,
        minute: data.inquiryTime.minute
      }).toISO()
      appeal.inquiry.hasDays = data.hasInquiryDays
      appeal.inquiry.days = data.inquiryDays
      appeal.inquiry.hasAddress = data.hasInquiryAddress
      appeal.inquiry.address = data.inquiryAddress

      appeal.LPAQuestionnaireDueDate = DateTime.fromObject({
        day: data.LPAQuestionnaireDueDate.day,
        month: data.LPAQuestionnaireDueDate.month,
        year: data.LPAQuestionnaireDueDate.year
      }).toISO()

      appeal.statementsDueDate = DateTime.fromObject({
        day: data.statementsDueDate.day,
        month: data.statementsDueDate.month,
        year: data.statementsDueDate.year
      }).toISO()

      appeal.interestedPartyCommentsDueDate = DateTime.fromObject({
        day: data.interestedPartyCommentsDueDate.day,
        month: data.interestedPartyCommentsDueDate.month,
        year: data.interestedPartyCommentsDueDate.year
      }).toISO()

      appeal.statementOfCommonGroundDueDate = DateTime.fromObject({
        day: data.statementOfCommonGroundDueDate.day,
        month: data.statementOfCommonGroundDueDate.month,
        year: data.statementOfCommonGroundDueDate.year
      }).toISO()

      appeal.proofOfEvidenceAndWitnessesDueDate = DateTime.fromObject({
        day: data.proofOfEvidenceAndWitnessesDueDate.day,
        month: data.proofOfEvidenceAndWitnessesDueDate.month,
        year: data.proofOfEvidenceAndWitnessesDueDate.year
      }).toISO()

      if(appeal.appealForm.hasPlanningObligation == 'Yes' && appeal.appealForm.readyToSubmitPlanningObligation == 'No') {
        appeal.planningObligationDueDate = DateTime.fromObject({
          day: data.planningObligationDueDate.day,
          month: data.planningObligationDueDate.month,
          year: data.planningObligationDueDate.year
        }).toISO()
      }
    }

    appeal.status = 'Awaiting LPAQ'
    appeal.procedure = data.procedure
    appeal.startDate = new Date()

    req.flash('success', 'Timetable started')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

  router.get('/main/appeals/:appealId/start-case/confirm', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/start-case/confirm', {
      appeal
    })

  })

  router.post('/main/appeals/:appealId/start-case/confirm', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.status = 'Awaiting LPAQ'
    req.flash('success', 'Timetable started')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}