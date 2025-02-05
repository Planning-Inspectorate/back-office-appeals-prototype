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

      if(application.startDate) {
        timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/start-case`, text: 'Change' }}))
        timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Change' }}))
        timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Change' }}))
        timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Change' }}))
      } else {
        timetable.push(row({ key: 'Start date', value: 'Not started', action: { href: `/main/cases/${application.id}/start-case`, text: 'Start' }}))
        timetable.push(row({ key: 'LPA questionnaire due', value: 'Not added', action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Add' } }))
        timetable.push(row({ key: 'Statements due', value: 'Not added', action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Add' } }))
        timetable.push(row({ key: 'Interested party comments due', value: 'Not added', action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Add' } }))
      }

      if(application.procedure) {
        if(application.statementOfCommonGroundDueDate) {
          timetable.push(row({ key: 'Statement of common ground due', value: DateTime.fromISO(application.statementOfCommonGroundDueDate).toFormat("d MMMM yyyy"), action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Change' }}))
        } else {
          timetable.push(row({ key: 'Statement of common ground due', value: 'Not added', action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Add' }}))
        }

        if(application.proofOfEvidenceAndWitnessesDueDate) {
          timetable.push(row({ key: 'Proof of evidence and witnesses due', value: moment(application.proofOfEvidenceAndWitnessesDueDate).format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Change' }}))
        } else {
          timetable.push(row({ key: 'Proof of evidence and witnesses due', value: 'Not added', action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Add' }}))
        }

        if(application.planningObligationDueDate) {
          timetable.push(row({ key: 'Planning obligation due', value: DateTime.fromISO(application.planningObligationDueDate).toFormat("d MMMM yyyy"), action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Change' }}))
        } else {
          timetable.push(row({ key: 'Planning obligation due', value: 'Not added', action: { href: `/main/cases/${application.id}/add-timetable-due-dates`, text: 'Add' }}))
        }

        timetable.push(row({ key: 'Case management conference', value: 'Not set up', action: { href: `/main/cases/${application.id}/add-cmc`, text: 'Set up' }}))

        if(application.inquiry) {
          let inquiryDate = moment({
            year: application.inquiry.date.year,
            month: application.inquiry.date.month - 1,
            day: application.inquiry.day}
          ).format('D MMMM YYYY')
          timetable.push(row({ key: 'Inquiry', value: inquiryDate, action: { href: `/main/cases/${application.id}/edit-inquiry`, text: 'Change' }}))
        } else {
          timetable.push(row({ key: 'Inquiry', value: 'Not set up', action: { href: `/main/cases/${application.id}/add-inquiry`, text: 'Set up' }}))
        }
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