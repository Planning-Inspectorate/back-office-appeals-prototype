
const generateTimetableBeforeProcedure = (application) => {
  let timetable = {}
  switch(application.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.validDate = 'Not validated'
      break
    case 'Ready to start':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = 'Not started'
      break
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Site visit ready to set up':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.siteVisitDate = 'Not set up'
      break
    case 'Awaiting site visit':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.siteVisitDate = new Date().toISOString()
      break
  }
  return timetable
}

const generateTimetableWritten = (application) => {
  let timetable = {}
  switch(application.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.validDate = 'Not validated'
      break
    case 'Ready to start':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = 'Not started'
      break
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to review':
    case 'Awaiting final comments':
    case 'Final comments ready to review':
    case 'Final comments ready to share':
    case 'Site visit ready to set up':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.LPAStatementDueDate = new Date().toISOString()
      timetable.interestedPartyCommentsDueDate = new Date().toISOString()
      timetable.siteVisitDate = 'Not set up'
      console.log(5858585)
      break
    case 'Awaiting site visit':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.LPAStatementDueDate = new Date().toISOString()
      timetable.interestedPartyCommentsDueDate = new Date().toISOString()
      timetable.siteVisitDate = new Date().toISOString()
      break
  }
  return timetable
}

const generateTimetableHearing = (application) => {
  let timetable = {}
  switch(application.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.validDate = 'Not validated'
      break
    case 'Ready to start':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = 'Not started'
      break
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to share':
    case 'Hearing ready to set up':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.LPAStatementDueDate = new Date().toISOString()
      timetable.LPAStatementDueDate = new Date().toISOString()
      timetable.interestedPartyCommentsDueDate = new Date().toISOString()
      timetable.statementOfCommonGroundDueDate = new Date().toISOString()
      timetable.planningObligationDueDate = 'Awaiting hearing date'
      timetable.hearingDate = 'Not set up'
      break
    case 'Awaiting hearing':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.LPAStatementDueDate = new Date().toISOString()
      timetable.interestedPartyCommentsDueDate = new Date().toISOString()
      timetable.statementOfCommonGroundDueDate = new Date().toISOString()
      timetable.planningObligationDueDate = new Date().toISOString()
      timetable.hearingDate = new Date().toISOString()
      break
  }
  return timetable
}

const generateTimetableInquiry = (application) => {
  let timetable = {}
  switch(application.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.validDate = 'Not validated'
      break
    case 'Ready to start':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = 'Not started'
      break
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to review':
    case 'Inquiry ready to set up':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.LPAStatementDueDate = new Date().toISOString()
      timetable.rule6StatementsDueDate = new Date().toISOString()
      timetable.interestedPartyCommentsDueDate = new Date().toISOString()
      timetable.statementOfCommonGroundDueDate = new Date().toISOString()
      timetable.cmcDate = 'Not set up'
      timetable.appellantEvidenceDueDate = 'Awaiting inquiry date'
      timetable.lpaEvidenceDueDate = 'Awaiting inquiry date'
      timetable.rule6EvidenceDueDate = 'Awaiting inquiry date'
      timetable.planningObligationDueDate = 'Awaiting inquiry date'
      timetable.inquiryDate = 'Not set up'
      break
    case 'Awaiting proof of evidence and witnesses':
    case 'Proof of evidence and witnesses ready to review':
    case 'Proof of evidence and witnesses ready to share':
    case 'Awaiting inquiry':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.LPAStatementDueDate = new Date().toISOString()
      timetable.rule6StatementsDueDate = new Date().toISOString()
      timetable.interestedPartyCommentsDueDate = new Date().toISOString()
      timetable.statementOfCommonGroundDueDate = new Date().toISOString()
      timetable.cmcDate = new Date().toISOString()
      timetable.appellantEvidenceDueDate = new Date().toISOString()
      timetable.lpaEvidenceDueDate = new Date().toISOString()
      timetable.rule6EvidenceDueDate = new Date().toISOString()
      timetable.planningObligationDueDate = new Date().toISOString()
      timetable.inquiryDate = new Date().toISOString()
      break
  }
  return timetable
}

const generateTimetable = (application) => {
  if(application.procedure == 'Inquiry') {
    return generateTimetableInquiry(application)
  }
  if(application.procedure == 'Hearing') {
    return generateTimetableHearing(application)
  }
  if(application.procedure == 'Written representations') {
    return generateTimetableWritten(application)
  }
  return generateTimetableBeforeProcedure(application)
}

module.exports = router => {

  router.get('/main/cases/:appealId', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let timetable = generateTimetable(application)

    res.render('/main/cases/show', {
      application,
      timetable
    })
  })

}