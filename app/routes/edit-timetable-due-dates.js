const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/appeals/:appealId/edit-timetable-due-dates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/edit-timetable-due-dates/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/edit-timetable-due-dates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let editTimetableDueDates = req.body.editTimetableDueDates


    req.flash('success', 'Timetable due dates updated')

    if(editTimetableDueDates.LPAQuestionnaireDueDate.day.length) {
      appeal.LPAQuestionnaireDueDate = DateTime.fromObject({
        day: editTimetableDueDates.LPAQuestionnaireDueDate.day,
        month: editTimetableDueDates.LPAQuestionnaireDueDate.month,
        year: editTimetableDueDates.LPAQuestionnaireDueDate.year
      }).toISO()
    } else {
      // appeal.LPAQuestionnaireDueDate = null
    }

    if(editTimetableDueDates.statementsDueDate.day.length) {
      appeal.statementsDueDate = DateTime.fromObject({
        day: editTimetableDueDates.statementsDueDate.day,
        month: editTimetableDueDates.statementsDueDate.month,
        year: editTimetableDueDates.statementsDueDate.year
      }).toISO()
    } else {
      // appeal.statementsDueDate = null
    }

    if(editTimetableDueDates.interestedPartyCommentsDueDate.day.length) {
      appeal.interestedPartyCommentsDueDate = DateTime.fromObject({
        day: editTimetableDueDates.interestedPartyCommentsDueDate.day,
        month: editTimetableDueDates.interestedPartyCommentsDueDate.month,
        year: editTimetableDueDates.interestedPartyCommentsDueDate.year
      }).toISO()
    } else {
      // appeal.interestedPartyCommentsDueDate = null
    }

    if(editTimetableDueDates.finalCommentsDueDate?.day.length) {
      appeal.finalCommentsDueDate = DateTime.fromObject({
        day: editTimetableDueDates.finalCommentsDueDate.day,
        month: editTimetableDueDates.finalCommentsDueDate.month,
        year: editTimetableDueDates.finalCommentsDueDate.year
      }).toISO()
    } else {
      // appeal.finalCommentsDueDate = null
    }

    if(editTimetableDueDates?.statementOfCommonGroundDueDate?.day.length) {
      appeal.statementOfCommonGroundDueDate = DateTime.fromObject({
        day: editTimetableDueDates.statementOfCommonGroundDueDate.day,
        month: editTimetableDueDates.statementOfCommonGroundDueDate.month,
        year: editTimetableDueDates.statementOfCommonGroundDueDate.year
      }).toISO()
    } else {
      // appeal.statementOfCommonGroundDueDate = null
    }

    if(editTimetableDueDates?.proofOfEvidenceAndWitnessesDueDate?.day.length) {
      appeal.proofOfEvidenceAndWitnessesDueDate = DateTime.fromObject({
        day: editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.day,
        month: editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.month,
        year: editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.year
      }).toISO()
    } else {
      // appeal.proofOfEvidenceAndWitnessesDueDate = null
    }

    if(editTimetableDueDates?.planningObligationDueDate?.day.length) {
      appeal.planningObligationDueDate = DateTime.fromObject({
        day: editTimetableDueDates.planningObligationDueDate.day,
        month: editTimetableDueDates.planningObligationDueDate.month,
        year: editTimetableDueDates.planningObligationDueDate.year
      }).toISO()
    } else {
      // appeal.planningObligationDueDate = null
    }

    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}