const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/cases/:appealId/start-case', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/start-case/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    if(req.session.data.startCase.procedure === 'Inquiry') {
      if(application.inquiry) {
        res.redirect(`/main/cases/${req.params.appealId}/start-case/inquiry-date`)
      } else {
        res.redirect(`/main/cases/${req.params.appealId}/start-case/has-inquiry`)
      }
    } else {
      res.redirect(`/main/cases/${req.params.appealId}/start-case/check`)
    }
  })

  router.get('/main/cases/:appealId/start-case/has-inquiry', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/start-case/has-inquiry', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case/has-inquiry', function (req, res) {
    if(req.session.data.startCase.hasInquiry == 'Yes') {
      res.redirect(`/main/cases/${req.params.appealId}/start-case/inquiry-date`)
    } else {
      res.redirect(`/main/cases/${req.params.appealId}/start-case/timetable-due-dates`)
    }
  })

  router.get('/main/cases/:appealId/start-case/inquiry-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/start-case/inquiry-date', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case/inquiry-date', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/start-case/inquiry-days`)
  })

  router.get('/main/cases/:appealId/start-case/inquiry-days', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/start-case/inquiry-days', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case/inquiry-days', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/start-case/has-inquiry-address`)
  })

router.get('/main/cases/:appealId/start-case/has-inquiry-address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
  res.render('/main/cases/start-case/has-inquiry-address', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case/has-inquiry-address', function (req, res) {
    if(req.session.data.startCase.hasInquiryAddress == 'Yes') {
      res.redirect(`/main/cases/${req.params.appealId}/start-case/inquiry-address`)
    } else {
      res.redirect(`/main/cases/${req.params.appealId}/start-case/timetable-due-dates`)
    }
  })

  router.get('/main/cases/:appealId/start-case/inquiry-address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/start-case/inquiry-address', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case/inquiry-address', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/start-case/timetable-due-dates`)
  })

  router.get('/main/cases/:appealId/start-case/timetable-due-dates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/start-case/timetable-due-dates', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case/timetable-due-dates', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/start-case/check`)
  })

  router.get('/main/cases/:appealId/start-case/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/start-case/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/start-case/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let data = req.session.data.startCase

    application.status = 'Awaiting LPAQ'
    application.procedure = data.procedure
    application.startDate = new Date()

    // Save inquiry
    if(data.inquiryDate) {
      application.inquiry = {}
      application.inquiry.date = DateTime.fromObject({
        day: data.inquiryDate.day,
        month: data.inquiryDate.month,
        year: data.inquiryDate.year
      }).toISO()
      application.inquiry.time = data.inquiryTime
      application.inquiry.hasDays = data.hasInquiryDays
      application.inquiry.days = data.inquiryDays
      application.inquiry.hasAddress = data.hasInquiryAddress
      application.inquiry.address = data.inquiryAddress
    }



    // Save timetable dates
    if(data.LPAQuestionnaireDueDate.day.length) {
      application.LPAQuestionnaireDueDate = DateTime.fromObject({
        day: data.LPAQuestionnaireDueDate.day,
        month: data.LPAQuestionnaireDueDate.month,
        year: data.LPAQuestionnaireDueDate.year
      }).toISO()
    } else {
      application.LPAQuestionnaireDueDate = null
    }

    if(data.statementsDueDate.day.length) {
      application.statementsDueDate = DateTime.fromObject({
        day: data.statementsDueDate.day,
        month: data.statementsDueDate.month,
        year: data.statementsDueDate.year
      }).toISO()
    } else {
      application.statementsDueDate = null
    }

    if(data.interestedPartyCommentsDueDate.day.length) {
      application.interestedPartyCommentsDueDate = DateTime.fromObject({
        day: data.interestedPartyCommentsDueDate.day,
        month: data.interestedPartyCommentsDueDate.month,
        year: data.interestedPartyCommentsDueDate.year
      }).toISO()
    } else {
      application.interestedPartyCommentsDueDate = null
    }

    if(data.statementOfCommonGroundDueDate.day.length) {
      application.statementOfCommonGroundDueDate = DateTime.fromObject({
        day: data.statementOfCommonGroundDueDate.day,
        month: data.statementOfCommonGroundDueDate.month,
        year: data.statementOfCommonGroundDueDate.year
      }).toISO()
    } else {
      application.statementOfCommonGroundDueDate = null
    }

    if(data.proofOfEvidenceAndWitnessesDueDate.day.length) {
      application.proofOfEvidenceAndWitnessesDueDate = DateTime.fromObject({
        day: data.proofOfEvidenceAndWitnessesDueDate.day,
        month: data.proofOfEvidenceAndWitnessesDueDate.month,
        year: data.proofOfEvidenceAndWitnessesDueDate.year
      }).toISO()
    } else {
      application.proofOfEvidenceAndWitnessesDueDate = null
    }

    if(data.planningObligationDueDate.day.length) {
      application.planningObligationDueDate = DateTime.fromObject({
        day: data.planningObligationDueDate.day,
        month: data.planningObligationDueDate.month,
        year: data.planningObligationDueDate.year
      }).toISO()
    } else {
      application.planningObligationDueDate = null
    }

    let applicationHasAllDueDates = application.LPAQuestionnaireDueDate && application.statementsDueDate && application.interestedPartyCommentsDueDate && application.statementOfCommonGroundDueDate && application.proofOfEvidenceAndWitnessesDueDate && application.planningObligationDueDate

    if(application.inquiry && applicationHasAllDueDates) {
      application.timetableShared = true
    }

    req.flash('success', 'Case started')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}