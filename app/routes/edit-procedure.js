const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/cases/:caseId/edit-procedure', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure', function (req, res) {
      res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/statement`)
  })

  router.get('/main/cases/:caseId/edit-procedure/statement', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/statement', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure/statement', function (req, res) {
    if(req.session.data.editProcedure.procedure == 'Inquiry') {
      res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/inquiry-date`)
    } else {
      res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/timetable-due-dates`)
    }
  })

  router.get('/main/cases/:caseId/edit-procedure/inquiry-date', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/inquiry-date', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure/inquiry-date', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/inquiry-days`)
  })

  router.get('/main/cases/:caseId/edit-procedure/inquiry-days', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/inquiry-days', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure/inquiry-days', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/has-inquiry-address`)
  })

  router.get('/main/cases/:caseId/edit-procedure/has-inquiry-address', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/has-inquiry-address', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure/has-inquiry-address', function (req, res) {
    if(req.session.data.editProcedure.hasInquiryAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/inquiry-address`)
    } else {
      res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/timetable-due-dates`)
    }
  })

  router.get('/main/cases/:caseId/edit-procedure/inquiry-address', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/inquiry-address', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure/inquiry-address', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/timetable-due-dates`)
  })

  router.get('/main/cases/:caseId/edit-procedure/timetable-due-dates', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/timetable-due-dates', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure/timetable-due-dates', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/edit-procedure/check`)
  })

  router.get('/main/cases/:caseId/edit-procedure/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-procedure/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-procedure/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    let data = req.session.data.editProcedure
    let currentProcedure = _case.procedure
    let newProcedure = data.procedure

    if(currentProcedure == 'Written representations') {
      // Cancel site visit when we have that concept
    }

    if(currentProcedure == 'Hearing' && _case.hearing) {
      // Cancel hearing
      delete _case.hearing
    }

    if(currentProcedure == 'Inquiry' && _case.inquiry) {
      // Cancel inquiry
      delete _case.inquiry
    }

    if(newProcedure == 'Written representations') {
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

      _case.finalCommentsDueDate = DateTime.fromObject({
        day: data.finalCommentsDueDate.day,
        month: data.finalCommentsDueDate.month,
        year: data.finalCommentsDueDate.year
      }).toISO()

    }

    if(newProcedure == 'Hearing') {
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

      _case.planningObligationDueDate = DateTime.fromObject({
        day: data.planningObligationDueDate.day,
        month: data.planningObligationDueDate.month,
        year: data.planningObligationDueDate.year
      }).toISO()
    }

    if(newProcedure == 'Inquiry') {
      // save inquiry
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

      // save timetable dates
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

      _case.planningObligationDueDate = DateTime.fromObject({
        day: data.planningObligationDueDate.day,
        month: data.planningObligationDueDate.month,
        year: data.planningObligationDueDate.year
      }).toISO()

    }

    _case.status = 'Awaiting LPAQ'
    _case.procedure = data.procedure
    _case.startDate = DateTime.now().toISO()

    delete req.session.data.editProcedure

    req.flash('success', 'Appeal procedure updated')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })
}