const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/cases/:appealId/edit-timetable-due-dates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/edit-timetable-due-dates/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/edit-timetable-due-dates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let editTimetableDueDates = req.body.editTimetableDueDates

    // let applicationHasNoDueDates = application.LPAQuestionnaireDueDate && application.statementsDueDate && application.interestedPartyCommentsDueDate && application.statementOfCommonGroundDueDate && application.proofOfEvidenceAndWitnessesDueDate && application.planningObligationDueDate

    // let userHasSubmittedAtLeastOneDueDate = editTimetableDueDates.LPAQuestionnaireDueDate || editTimetableDueDates.statementsDueDate || editTimetableDueDates.interestedPartyCommentsDueDate || editTimetableDueDates.statementOfCommonGroundDueDate || editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate || editTimetableDueDates.planningObligationDueDate

    if(req.body.noneSet) {
      req.flash('success', 'Timetable due dates added')
    } else {
      req.flash('success', 'Timetable due dates updated')
    }


    if(editTimetableDueDates.LPAQuestionnaireDueDate.day.length) {
      application.LPAQuestionnaireDueDate = DateTime.fromObject({
        day: editTimetableDueDates.LPAQuestionnaireDueDate.day,
        month: editTimetableDueDates.LPAQuestionnaireDueDate.month,
        year: editTimetableDueDates.LPAQuestionnaireDueDate.year
      }).toISO()
    } else {
      application.LPAQuestionnaireDueDate = null
    }

    if(editTimetableDueDates.statementsDueDate.day.length) {
      application.statementsDueDate = DateTime.fromObject({
        day: editTimetableDueDates.statementsDueDate.day,
        month: editTimetableDueDates.statementsDueDate.month,
        year: editTimetableDueDates.statementsDueDate.year
      }).toISO()
    } else {
      application.statementsDueDate = null
    }

    if(editTimetableDueDates.interestedPartyCommentsDueDate.day.length) {
      application.interestedPartyCommentsDueDate = DateTime.fromObject({
        day: editTimetableDueDates.interestedPartyCommentsDueDate.day,
        month: editTimetableDueDates.interestedPartyCommentsDueDate.month,
        year: editTimetableDueDates.interestedPartyCommentsDueDate.year
      }).toISO()
    } else {
      application.interestedPartyCommentsDueDate = null
    }

    if(editTimetableDueDates.statementOfCommonGroundDueDate.day.length) {
      application.statementOfCommonGroundDueDate = DateTime.fromObject({
        day: editTimetableDueDates.statementOfCommonGroundDueDate.day,
        month: editTimetableDueDates.statementOfCommonGroundDueDate.month,
        year: editTimetableDueDates.statementOfCommonGroundDueDate.year
      }).toISO()
    } else {
      application.statementOfCommonGroundDueDate = null
    }

    if(editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.day.length) {
      application.proofOfEvidenceAndWitnessesDueDate = DateTime.fromObject({
        day: editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.day,
        month: editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.month,
        year: editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.year
      }).toISO()
    } else {
      application.proofOfEvidenceAndWitnessesDueDate = null
    }

    if(editTimetableDueDates.planningObligationDueDate.day.length) {
      application.planningObligationDueDate = DateTime.fromObject({
        day: editTimetableDueDates.planningObligationDueDate.day,
        month: editTimetableDueDates.planningObligationDueDate.month,
        year: editTimetableDueDates.planningObligationDueDate.year
      }).toISO()
    } else {
      application.planningObligationDueDate = null
    }

    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}