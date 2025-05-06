const { DateTime } = require("luxon");

const row = params => {
  let row = {}
  row.key = { html: params.key }
  row.value = { html: params.value }
  if(params.action) {
    row.actions = {
      items: [{
        href: params.action.href,
        text: params.action.text,
        visuallyHiddentText: params.action.text
      }]
    }
  }

  return row
}

const generateTimetableHouseholder = (appeal) => {
  let timetable = []
  switch(appeal.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/appeals/${appeal.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
      timetable.push(row({ key: 'Valid date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: 'Not started', action: { href: `/main/appeals/${appeal.id}/start-case`, text: 'Start' }}))
      break
      case 'Awaiting LPAQ':
      case 'LPAQ ready to review':
      case 'Site visit ready to set up':
      case 'Awaiting site visit':
      case 'Decision ready to issue':
      case 'Decision issued':
        timetable.push(row({ key: 'Valid date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))
        timetable.push(row({ key: 'Start date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/start-case`, text: 'Change' }}))
        timetable.push(row({ key: 'LPA questionnaire due', value: DateTime.now().toFormat('d MMMM yyyy'),  action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))

        if(appeal.siteVisit) {
          timetable.push(row({ key: 'Site visit', value: DateTime.now().toFormat('d MMMM yyyy'),  action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))
        } else {
          timetable.push(row({ key: 'Site visit', value: 'Not set up',  action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Set up' }}))
        }

        if(appeal.status == 'Decision issued') {
          timetable.push(row({ key: 'Decision date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))
        }
  }
  return timetable
}

const generateTimetableWritten = (appeal) => {
  let timetable = []
  switch(appeal.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/appeals/${appeal.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to share':
    case 'Awaiting final comments':
    case 'Final comments ready to review':
    case 'Final comments ready to share':
    case 'Site visit ready to set up':
    case 'Awaiting site visit':
    case 'Decision ready to issue':
    case 'Decision issued':
      timetable.push(row({ key: 'Valid date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))

      if(appeal.startDate) {
        var value = DateTime.fromISO(appeal.startDate).toFormat("d MMMM yyyy")
        var url = `/main/appeals/${appeal.id}/edit-start-date`
        var cta = 'Change'
      } else {
        var value = 'Not started'
        var url = `/main/appeals/${appeal.id}/start-case`
        var cta = 'Start'
      }
      timetable.push(row({ key: 'Start date', value, action: { href: url, text: cta }}))

      var url = `/main/appeals/${appeal.id}/edit-timetable-due-dates`

      var value = DateTime.fromISO(appeal.LPAQuestionnaireDueDate).toFormat("d MMMM yyyy")
      timetable.push(row({ key: 'LPA questionnaire due', value, action: { href: url, text: 'Change' }}))

      var value = DateTime.fromISO(appeal.statementsDueDate).toFormat("d MMMM yyyy")
      timetable.push(row({ key: 'Statements due', value, action: { href: url, text: 'Change' }}))

      var value = DateTime.fromISO(appeal.interestedPartyCommentsDueDate).toFormat("d MMMM yyyy")
      timetable.push(row({ key: 'Interested party comments due', value, action: { href: url, text: 'Change' }}))

      var value = DateTime.fromISO(appeal.finalCommentsDueDate).toFormat("d MMMM yyyy")
      timetable.push(row({ key: 'Final comments due', value, action: { href: url, text: 'Change' }}))

      // Make dynamic
      timetable.push(row({ key: 'Site visit', value: 'Not set up',  action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Set up' }}))

      if(appeal.status == 'Decision issued') {
        timetable.push(row({ key: 'Decision date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))
      }

      break
  }
  return timetable
}

const generateTimetableHearing = (appeal) => {
  let timetable = []
  switch(appeal.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/appeals/${appeal.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to share':
    case 'Hearing ready to set up':
    case 'Awaiting hearing':
    case 'Decision ready to issue':
    case 'Decision issued':
      timetable.push(row({ key: 'Valid date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))

      if(appeal.startDate) {
        var value = DateTime.fromISO(appeal.startDate).toFormat("d MMMM yyyy")
        var url = `/main/appeals/${appeal.id}/edit-start-date`
        var cta = 'Change'
      } else {
        var value = 'Not started'
        var url = `/main/appeals/${appeal.id}/start-case`
        var cta = 'Start'
      }
      timetable.push(row({ key: 'Start date', value, action: { href: url, text: cta }}))

      var url = `/main/appeals/${appeal.id}/edit-timetable-due-dates`
      if(appeal.startDate) {

        var value = DateTime.fromISO(appeal.LPAQuestionnaireDueDate).toFormat("d MMMM yyyy")
        timetable.push(row({ key: 'LPA questionnaire due', value, action: { href: url, text: 'Change' }}))

        var value = DateTime.fromISO(appeal.statementsDueDate).toFormat("d MMMM yyyy")
        timetable.push(row({ key: 'Statements due', value, action: { href: url, text: 'Change' }}))

        var value = DateTime.fromISO(appeal.interestedPartyCommentsDueDate).toFormat("d MMMM yyyy")
        timetable.push(row({ key: 'Interested party comments due', value, action: { href: url, text: 'Change' }}))

        var value = DateTime.fromISO(appeal.statementOfCommonGroundDueDate).toFormat("d MMMM yyyy")
        timetable.push(row({ key: 'Statement of common ground due', value, action: { href: url, text: 'Change' }}))

        if(appeal.appealForm.hasPlanningObligation == 'Yes' && appeal.appealForm.readyToSubmitPlanningObligation == 'No') {
          var value = DateTime.fromISO(appeal.planningObligationDueDate).toFormat("d MMMM yyyy")
          timetable.push(row({ key: 'Planning obligation due', value, action: { href: url, text: 'Change' }}))
        }

        timetable.push(row({ key: 'Case management conference', value: 'Not set up', action: { href: `/main/appeals/${appeal.id}/add-cmc`, text: 'Set up' }}))
      }

      var key = 'Hearing'
      if(appeal.hearing) {
        var url = `/main/appeals/${appeal.id}/edit-hearing`
        var value = DateTime.fromISO(appeal.hearing.date).toFormat("d MMMM yyyy")
        var cta = 'Change'
      } else {
        var url = `/main/appeals/${appeal.id}/add-hearing`
        var value = 'Not set up'
        var cta = 'Set up'
      }
      timetable.push(row({ key, value, action: { href: url, text: cta }}))

      if(appeal.status == 'Decision issued') {
        timetable.push(row({ key: 'Decision date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))
      }

      break
  }
  return timetable
}

const generateTimetableInquiry = (appeal) => {
  let timetable = []
  switch(appeal.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/appeals/${appeal.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to share':
    case 'Inquiry ready to set up':
    case 'Awaiting proof of evidence and witnesses':
    case 'Proof of evidence and witnesses ready to review':
    case 'Proof of evidence and witnesses ready to share':
    case 'Awaiting inquiry':
    case 'Decision ready to issue':
    case 'Decision issued':
      timetable.push(row({ key: 'Valid date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))

      if(appeal.startDate) {
        var value = DateTime.fromISO(appeal.startDate).toFormat("d MMMM yyyy")
        var url = `/main/appeals/${appeal.id}/edit-start-date`
        var cta = 'Change'
      } else {
        var value = 'Not started'
        var url = `/main/appeals/${appeal.id}/start-case`
        var cta = 'Start'
      }
      timetable.push(row({ key: 'Start date', value, action: { href: url, text: cta }}))

      var url = `/main/appeals/${appeal.id}/edit-timetable-due-dates`

      if(appeal.startDate) {
        var value = DateTime.fromISO(appeal.LPAQuestionnaireDueDate).toFormat("d MMMM yyyy")
        timetable.push(row({ key: 'LPA questionnaire due', value, action: { href: url, text: 'Change' }}))

        var value = DateTime.fromISO(appeal.statementsDueDate).toFormat("d MMMM yyyy")
        timetable.push(row({ key: 'Statements due', value, action: { href: url, text: 'Change' }}))

        var value = DateTime.fromISO(appeal.interestedPartyCommentsDueDate).toFormat("d MMMM yyyy")
        timetable.push(row({ key: 'Interested party comments due', value, action: { href: url, text: 'Change' }}))

        var value = DateTime.fromISO(appeal.statementOfCommonGroundDueDate).toFormat("d MMMM yyyy")
        timetable.push(row({ key: 'Statement of common ground due', value, action: { href: url, text: 'Change' }}))

        var value = DateTime.fromISO(appeal.proofOfEvidenceAndWitnessesDueDate).toFormat("d MMMM yyyy")
        timetable.push(row({ key: 'Proof of evidence and witnesses due', value, action: { href: url, text: 'Change' }}))

        if(appeal.appealForm.hasPlanningObligation == 'Yes' && appeal.appealForm.readyToSubmitPlanningObligation == 'No') {
          var value = DateTime.fromISO(appeal.planningObligationDueDate).toFormat("d MMMM yyyy")
          timetable.push(row({ key: 'Planning obligation due', value, action: { href: url, text: 'Change' }}))
        }

        timetable.push(row({ key: 'Case management conference', value: 'Not set up', action: { href: `/main/appeals/${appeal.id}/add-cmc`, text: 'Set up' }}))

        var key = 'Inquiry'
        if(appeal.inquiry) {
          var url = `/main/appeals/${appeal.id}/edit-inquiry`
          var value = DateTime.fromISO(appeal.inquiry.date).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var url = `/main/appeals/${appeal.id}/add-inquiry`
          var value = 'Not set up'
          var cta = 'Set up'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))
      }

      if(appeal.status == 'Decision issued') {
        timetable.push(row({ key: 'Decision date', value: DateTime.now().toFormat('d MMMM yyyy'), action: { href: `/main/appeals/${appeal.id}/xyz`, text: 'Change' }}))
      }

      break
  }
  return timetable
}

const generateTimetable = (appeal) => {
  if(appeal?.procedure == 'Inquiry') {
    return generateTimetableInquiry(appeal)
  }
  if(appeal?.procedure == 'Hearing') {
    return generateTimetableHearing(appeal)
  }
  if(appeal?.procedure == 'Written representations') {
    return generateTimetableWritten(appeal)
  }
  // Use for everything else ()
  return generateTimetableHouseholder(appeal)
}

module.exports = {
  generateTimetable
}