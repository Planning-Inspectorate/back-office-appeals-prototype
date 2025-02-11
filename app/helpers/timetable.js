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

const generateTimetableHouseholder = (_case) => {
  let timetable = []
  switch(_case.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/cases/${_case.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: 'Not started', action: { href: `/main/cases/${_case.id}/start-case`, text: 'Start' }}))
      break
      case 'Awaiting LPAQ':
      case 'LPAQ ready to review':
      case 'Site visit ready to set up':
        timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
        timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/start-case`, text: 'Change' }}))
        timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
        timetable.push(row({ key: 'Site visit', value: 'Not set up',  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Set up' }}))
        break
      case 'Awaiting site visit':
      case 'Decision ready to issue':
        timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
        timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/start-case`, text: 'Change' }}))
        timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
        timetable.push(row({ key: 'Site visit', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
        break
  }
  return timetable
}

const generateTimetableWritten = (_case) => {
  let timetable = []
  switch(_case.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/cases/${_case.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: 'Not started', action: { href: `/main/cases/${_case.id}/start-case`, text: 'Start' }}))
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
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/start-case`, text: 'Change' }}))
      timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Final comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Site visit', value: 'Not set up',  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Set up' }}))
      break
    case 'Awaiting site visit':
    case 'Decision ready to issue':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/start-case`, text: 'Change' }}))
      timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Final comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Site visit', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      break
  }
  return timetable
}

const generateTimetableHearing = (_case) => {
  let timetable = []
  switch(_case.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/cases/${_case.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: 'Not started', action: { href: `/main/cases/${_case.id}/start-case`, text: 'Start' }}))
      break
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to share':
    case 'Hearing ready to set up':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/start-case`, text: 'Change' }}))
      timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statement of common ground due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/edit-statement-of-common-ground-due-date`, text: 'Change' }}))
      timetable.push(row({ key: 'Planning obligation due', value: 'Awaiting hearing date',  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Hearing', value: 'Not set up',  action: { href: `/main/cases/${_case.id}/add-hearing`, text: 'Set up' }}))
      break
    case 'Awaiting hearing':
    case 'Decision ready to issue':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/start-case`, text: 'Change' }}))
      timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statement of common ground due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Planning obligation due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Hearing', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${_case.id}/add-hearing`, text: 'Set up' }}))
      break
  }
  return timetable
}

const generateTimetableInquiry = (_case) => {
  let timetable = []
  switch(_case.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/cases/${_case.id}/validate`, text: 'Validate' }}))
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
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${_case.id}/xyz`, text: 'Change' }}))


      var key = 'Start date'
      if(_case.startDate) {
        var value = DateTime.fromISO(_case.startDate).toFormat("d MMMM yyyy")
        var url = `/main/cases/${_case.id}/edit-start-date`
        var cta = 'Change'
      } else {
        var value = 'Not started'
        var url = `/main/cases/${_case.id}/start-case`
        var cta = 'Start'
      }
      timetable.push(row({ key, value, action: { href: url, text: cta }}))

      if(_case.procedure) {

        var key = 'LPA questionnaire due'
        var url = `/main/cases/${_case.id}/edit-timetable-due-dates`
        if(_case.LPAQuestionnaireDueDate) {
          var value = DateTime.fromISO(_case.LPAQuestionnaireDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Statements due'
        var url = `/main/cases/${_case.id}/edit-timetable-due-dates`
        if(_case.statementsDueDate) {
          var value = DateTime.fromISO(_case.statementsDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Interested party comments due'
        var url = `/main/cases/${_case.id}/edit-timetable-due-dates`
        if(_case.interestedPartyCommentsDueDate) {
          var value = DateTime.fromISO(_case.interestedPartyCommentsDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Statement of common ground due'
        var url = `/main/cases/${_case.id}/edit-timetable-due-dates`
        if(_case.statementOfCommonGroundDueDate) {
          var value = DateTime.fromISO(_case.statementOfCommonGroundDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Proof of evidence and witnesses due'
        var url = `/main/cases/${_case.id}/edit-timetable-due-dates`
        if(_case.proofOfEvidenceAndWitnessesDueDate) {
          var value = DateTime.fromISO(_case.proofOfEvidenceAndWitnessesDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        var key = 'Planning obligation due'
        var url = `/main/cases/${_case.id}/edit-timetable-due-dates`
        if(_case.planningObligationDueDate) {
          var value = DateTime.fromISO(_case.planningObligationDueDate).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))

        timetable.push(row({ key: 'Case management conference', value: 'Not set up', action: { href: `/main/cases/${_case.id}/add-cmc`, text: 'Set up' }}))


        var key = 'Inquiry'
        var url = `/main/cases/${_case.id}/edit-timetable-due-dates`
        if(_case.inquiry) {
          var url = `/main/cases/${_case.id}/edit-inquiry`
          var value = DateTime.fromISO(_case.inquiry.date).toFormat("d MMMM yyyy")
          var cta = 'Change'
        } else {
          var url = `/main/cases/${_case.id}/add-inquiry`
          var value = 'Not added'
          var cta = 'Add'
        }
        timetable.push(row({ key, value, action: { href: url, text: cta }}))
      }

      break
  }
  return timetable
}

const generateTimetable = (_case) => {
  if(_case.procedure == 'Inquiry') {
    return generateTimetableInquiry(_case)
  }
  if(_case.procedure == 'Hearing') {
    return generateTimetableHearing(_case)
  }
  if(_case.procedure == 'Written representations') {
    return generateTimetableWritten(_case)
  }
  return generateTimetableHouseholder(_case)
}

module.exports = {
  generateTimetable
}