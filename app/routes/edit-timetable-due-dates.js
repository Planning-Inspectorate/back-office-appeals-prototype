const { DateTime } = require("luxon");

module.exports = router => {

  router.get('/main/cases/:caseId/edit-timetable-due-dates', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/edit-timetable-due-dates/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/edit-timetable-due-dates', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    let editTimetableDueDates = req.body.editTimetableDueDates

    // let _caseHasNoDueDates = _case.LPAQuestionnaireDueDate && _case.statementsDueDate && _case.interestedPartyCommentsDueDate && _case.statementOfCommonGroundDueDate && _case.proofOfEvidenceAndWitnessesDueDate && _case.planningObligationDueDate

    // let userHasSubmittedAtLeastOneDueDate = editTimetableDueDates.LPAQuestionnaireDueDate || editTimetableDueDates.statementsDueDate || editTimetableDueDates.interestedPartyCommentsDueDate || editTimetableDueDates.statementOfCommonGroundDueDate || editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate || editTimetableDueDates.planningObligationDueDate

    if(req.body.noneSet) {
      req.flash('success', 'Timetable due dates added')
    } else {
      req.flash('success', 'Timetable due dates updated')
    }


    if(editTimetableDueDates.LPAQuestionnaireDueDate.day.length) {
      _case.LPAQuestionnaireDueDate = DateTime.fromObject({
        day: editTimetableDueDates.LPAQuestionnaireDueDate.day,
        month: editTimetableDueDates.LPAQuestionnaireDueDate.month,
        year: editTimetableDueDates.LPAQuestionnaireDueDate.year
      }).toISO()
    } else {
      _case.LPAQuestionnaireDueDate = null
    }

    if(editTimetableDueDates.statementsDueDate.day.length) {
      _case.statementsDueDate = DateTime.fromObject({
        day: editTimetableDueDates.statementsDueDate.day,
        month: editTimetableDueDates.statementsDueDate.month,
        year: editTimetableDueDates.statementsDueDate.year
      }).toISO()
    } else {
      _case.statementsDueDate = null
    }

    if(editTimetableDueDates.interestedPartyCommentsDueDate.day.length) {
      _case.interestedPartyCommentsDueDate = DateTime.fromObject({
        day: editTimetableDueDates.interestedPartyCommentsDueDate.day,
        month: editTimetableDueDates.interestedPartyCommentsDueDate.month,
        year: editTimetableDueDates.interestedPartyCommentsDueDate.year
      }).toISO()
    } else {
      _case.interestedPartyCommentsDueDate = null
    }

    if(editTimetableDueDates.statementOfCommonGroundDueDate.day.length) {
      _case.statementOfCommonGroundDueDate = DateTime.fromObject({
        day: editTimetableDueDates.statementOfCommonGroundDueDate.day,
        month: editTimetableDueDates.statementOfCommonGroundDueDate.month,
        year: editTimetableDueDates.statementOfCommonGroundDueDate.year
      }).toISO()
    } else {
      _case.statementOfCommonGroundDueDate = null
    }

    if(editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.day.length) {
      _case.proofOfEvidenceAndWitnessesDueDate = DateTime.fromObject({
        day: editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.day,
        month: editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.month,
        year: editTimetableDueDates.proofOfEvidenceAndWitnessesDueDate.year
      }).toISO()
    } else {
      _case.proofOfEvidenceAndWitnessesDueDate = null
    }

    if(editTimetableDueDates.planningObligationDueDate.day.length) {
      _case.planningObligationDueDate = DateTime.fromObject({
        day: editTimetableDueDates.planningObligationDueDate.day,
        month: editTimetableDueDates.planningObligationDueDate.month,
        year: editTimetableDueDates.planningObligationDueDate.year
      }).toISO()
    } else {
      _case.planningObligationDueDate = null
    }

    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}