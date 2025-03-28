const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/appeals/:appealId/edit-procedure', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-procedure/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-procedure', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    if(appeal.lpaStatement) {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/statement`)
    } else {
      if(req.session.data.editProcedure.procedure == 'Inquiry') {
        res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/inquiry-date`)
      } else {
        res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/timetable-due-dates`)
      }
    }
  })

  router.get('/main/appeals/:appealId/edit-procedure/statement', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-procedure/statement', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-procedure/statement', function (req, res) {
    if(req.session.data.editProcedure.procedure == 'Inquiry') {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/inquiry-date`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/timetable-due-dates`)
    }
  })

  router.get('/main/appeals/:appealId/edit-procedure/inquiry-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-procedure/inquiry-date', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-procedure/inquiry-date', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/inquiry-days`)
  })

  router.get('/main/appeals/:appealId/edit-procedure/inquiry-days', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-procedure/inquiry-days', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-procedure/inquiry-days', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/has-inquiry-address`)
  })

  router.get('/main/appeals/:appealId/edit-procedure/has-inquiry-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-procedure/has-inquiry-address', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-procedure/has-inquiry-address', function (req, res) {
    if(req.session.data.editProcedure.hasInquiryAddress == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/inquiry-address`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/timetable-due-dates`)
    }
  })

  router.get('/main/appeals/:appealId/edit-procedure/inquiry-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-procedure/inquiry-address', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-procedure/inquiry-address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/timetable-due-dates`)
  })

  router.get('/main/appeals/:appealId/edit-procedure/timetable-due-dates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-procedure/timetable-due-dates', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-procedure/timetable-due-dates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/edit-procedure/check`)
  })

  router.get('/main/appeals/:appealId/edit-procedure/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-procedure/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-procedure/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let data = req.session.data.editProcedure
    let currentProcedure = appeal.procedure
    let newProcedure = data.procedure

    if(currentProcedure == 'Written representations') {
      // Cancel site visit when we have that concept
      delete appeal.siteVisit
    }

    if(currentProcedure == 'Hearing' && appeal.hearing) {
      // Cancel hearing
      delete appeal.hearing
    }

    if(currentProcedure == 'Inquiry' && appeal.inquiry) {
      // Cancel inquiry
      delete appeal.inquiry
    }

    if(newProcedure == 'Written representations') {
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

      appeal.finalCommentsDueDate = DateTime.fromObject({
        day: data.finalCommentsDueDate.day,
        month: data.finalCommentsDueDate.month,
        year: data.finalCommentsDueDate.year
      }).toISO()

      if(appeal.appealForm.hasPlanningObligation == 'Yes' && appeal.appealForm.readyToSubmitPlanningObligation == 'No') {
        appeal.planningObligationDueDate = DateTime.fromObject({
          day: data.planningObligationDueDate.day,
          month: data.planningObligationDueDate.month,
          year: data.planningObligationDueDate.year
        }).toISO()
      }

    }

    if(newProcedure == 'Hearing') {
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

      if(appeal.appealForm.hasPlanningObligation == 'Yes' && appeal.appealForm.readyToSubmitPlanningObligation == 'No') {
        appeal.planningObligationDueDate = DateTime.fromObject({
          day: data.planningObligationDueDate.day,
          month: data.planningObligationDueDate.month,
          year: data.planningObligationDueDate.year
        }).toISO()
      }
    }

    if(newProcedure == 'Inquiry') {
      // save inquiry
      appeal.inquiry = {}
      appeal.inquiry.date = DateTime.fromObject({
        day: data.inquiryDate.day,
        month: data.inquiryDate.month,
        year: data.inquiryDate.year,
        hour: data.inquiryDate.hour,
        minute: data.inquiryDate.minute
      }).toISO()
      appeal.inquiry.hasDays = data.hasInquiryDays
      appeal.inquiry.days = data.inquiryDays
      appeal.inquiry.hasAddress = data.hasInquiryAddress
      appeal.inquiry.address = data.inquiryAddress

      // save timetable dates
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
    appeal.startDate = DateTime.now().toISO()

    delete req.session.data.editProcedure

    req.flash('success', 'Appeal procedure updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })
}