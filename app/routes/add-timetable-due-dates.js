const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/cases/:appealId/add-timetable-due-dates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-timetable-due-dates/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-timetable-due-dates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let addTimetableDueDates = req.body.addTimetableDueDates

    if(addTimetableDueDates.LPAQuestionnaireDueDate.day) {
      application.LPAQuestionnaireDueDate = DateTime.fromObject({
        day: addTimetableDueDates.LPAQuestionnaireDueDate.day,
        month: addTimetableDueDates.LPAQuestionnaireDueDate.month,
        year: addTimetableDueDates.LPAQuestionnaireDueDate.year
      }).toISO()
    }

    if(addTimetableDueDates.statementsDueDate.day) {
      application.statementsDueDate = DateTime.fromObject({
        day: addTimetableDueDates.statementsDueDate.day,
        month: addTimetableDueDates.statementsDueDate.month,
        year: addTimetableDueDates.statementsDueDate.year
      }).toISO()
    }

    if(addTimetableDueDates.interestedPartyCommentsDueDate.day) {
      application.interestedPartyCommentsDueDate = DateTime.fromObject({
        day: addTimetableDueDates.interestedPartyCommentsDueDate.day,
        month: addTimetableDueDates.interestedPartyCommentsDueDate.month,
        year: addTimetableDueDates.interestedPartyCommentsDueDate.year
      }).toISO()
    }

    if(addTimetableDueDates.statementOfCommonGroundDueDate.day) {
      application.statementOfCommonGroundDueDate = DateTime.fromObject({
        day: addTimetableDueDates.statementOfCommonGroundDueDate.day,
        month: addTimetableDueDates.statementOfCommonGroundDueDate.month,
        year: addTimetableDueDates.statementOfCommonGroundDueDate.year
      }).toISO()
    }

    if(addTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.day) {
      application.proofOfEvidenceAndWitnessesDueDate = DateTime.fromObject({
        day: addTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.day,
        month: addTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.month,
        year: addTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.year
      }).toISO()
    }

    if(addTimetableDueDates.planningObligationDueDate.day) {
      application.planningObligationDueDate = DateTime.fromObject({
        day: addTimetableDueDates.planningObligationDueDate.day,
        month: addTimetableDueDates.planningObligationDueDate.month,
        year: addTimetableDueDates.planningObligationDueDate.year
      }).toISO()
    }

    req.flash('success', 'Timetable due dates added')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}