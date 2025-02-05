const moment = require('moment')
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

const generateTimetableHouseholder = (application) => {
  let timetable = []
  switch(application.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/cases/${application.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: 'Not started', action: { href: `/main/cases/${application.id}/start-case`, text: 'Start' }}))
      break
      case 'Awaiting LPAQ':
      case 'LPAQ ready to review':
      case 'Site visit ready to set up':
        timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
        timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/start-case`, text: 'Change' }}))
        timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
        timetable.push(row({ key: 'Site visit', value: 'Not set up',  action: { href: `/main/cases/${application.id}/xyz`, text: 'Set up' }}))
        break
      case 'Awaiting site visit':
      case 'Decision ready to issue':
        timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
        timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/start-case`, text: 'Change' }}))
        timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
        timetable.push(row({ key: 'Site visit', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
        break
  }
  return timetable
}

const generateTimetableWritten = (application) => {
  let timetable = []
  switch(application.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/cases/${application.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: 'Not started', action: { href: `/main/cases/${application.id}/start-case`, text: 'Start' }}))
      break
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to share':
    case 'Awaiting final comments':
    case 'Final comments ready to review':
    case 'Final comments ready to share':
    case 'Site visit ready to set up':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/start-case`, text: 'Change' }}))
      timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Final comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Site visit', value: 'Not set up',  action: { href: `/main/cases/${application.id}/xyz`, text: 'Set up' }}))
      break
    case 'Awaiting site visit':
    case 'Decision ready to issue':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/start-case`, text: 'Change' }}))
      timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Final comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Site visit', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      break
  }
  return timetable
}

const generateTimetableHearing = (application) => {
  let timetable = []
  switch(application.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/cases/${application.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: 'Not started', action: { href: `/main/cases/${application.id}/start-case`, text: 'Start' }}))
      break
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to share':
    case 'Hearing ready to set up':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/start-case`, text: 'Change' }}))
      timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statement of common ground due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/edit-statement-of-common-ground-due-date`, text: 'Change' }}))
      timetable.push(row({ key: 'Planning obligation due', value: 'Awaiting hearing date',  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Hearing', value: 'Not set up',  action: { href: `/main/cases/${application.id}/add-hearing`, text: 'Set up' }}))
      break
    case 'Awaiting hearing':
    case 'Decision ready to issue':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/start-case`, text: 'Change' }}))
      timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statement of common ground due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Planning obligation due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Hearing', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/add-hearing`, text: 'Set up' }}))
      break
  }
  return timetable
}

const generateTimetableInquiry = (application) => {
  let timetable = []
  switch(application.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/cases/${application.id}/validate`, text: 'Validate' }}))
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
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))


      var key = 'Start date'
      if(application.startDate) {
        var value = DateTime.fromISO(application.startDate).toFormat("d MMMM yyyy")
        var url = `/main/cases/${application.id}/edit-start-date`
        var cta = 'Change'
      } else {
        var value = 'Not started'
        var url = `/main/cases/${application.id}/start-case`
        var cta = 'Start'
      }
      timetable.push(row({ key, value, action: { href: url, text: cta }}))

      if(application.procedure) {

        var key = 'LPA questionnaire due'
        var url = `/main/cases/${application.id}/edit-timetable-due-dates`
        if(application.LPAQuestionnaireDueDate) {
          var value = DateTime.fromISO(application.LPAQuestionnaireDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Statements due'
        var url = `/main/cases/${application.id}/edit-timetable-due-dates`
        if(application.statementsDueDate) {
          var value = DateTime.fromISO(application.statementsDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Interested party comments due'
        var url = `/main/cases/${application.id}/edit-timetable-due-dates`
        if(application.interestedPartyCommentsDueDate) {
          var value = DateTime.fromISO(application.interestedPartyCommentsDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Statement of common ground due'
        var url = `/main/cases/${application.id}/edit-timetable-due-dates`
        if(application.statementOfCommonGroundDueDate) {
          var value = DateTime.fromISO(application.statementOfCommonGroundDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Proof of evidence and witnesses due'
        var url = `/main/cases/${application.id}/edit-timetable-due-dates`
        if(application.proofOfEvidenceAndWitnessesDueDate) {
          var value = DateTime.fromISO(application.proofOfEvidenceAndWitnessesDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Planning obligation due'
        var url = `/main/cases/${application.id}/edit-timetable-due-dates`
        if(application.planningObligationDueDate) {
          var value = DateTime.fromISO(application.planningObligationDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        timetable.push(row({ key: 'Case management conference', value: 'Not set up', action: { href: `/main/cases/${application.id}/add-cmc`, text: 'Set up' }}))


        var key = 'Inquiry'
        if(application.inquiry) {
          var url = `/main/cases/${application.id}/edit-inquiry`
          var value = moment({
            year: application.inquiry.date.year,
            month: application.inquiry.date.month - 1,
            day: application.inquiry.day}
          ).format('D MMMM YYYY')
          var cta = 'Change'
        } else {
          var url = `/main/cases/${application.id}/add-inquiry`
          var value = 'Not set up'
          var cta = 'Set up'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))
      }

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
  return generateTimetableHouseholder(application)
}

module.exports = {
  generateTimetable
}