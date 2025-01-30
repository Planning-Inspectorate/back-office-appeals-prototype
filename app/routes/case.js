
const moment = require('moment')

const generateTimetableBeforeProcedure = (application) => {
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
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.siteVisitDate = 'Not set up'
      break
    case 'Awaiting site visit':
    case 'Decision ready to issue':
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
      timetable.finalCommentsDueDate = new Date().toISOString()
      timetable.siteVisitDate = 'Not set up'
      break
    case 'Awaiting site visit':
    case 'Decision ready to issue':
      timetable.validDate = new Date().toISOString()
      timetable.startDate = new Date().toISOString()
      timetable.LPAQDueDate = new Date().toISOString()
      timetable.LPAStatementDueDate = new Date().toISOString()
      timetable.interestedPartyCommentsDueDate = new Date().toISOString()
      timetable.finalCommentsDueDate = new Date().toISOString()
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
    case 'Decision ready to issue':
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

const generateTimetableInquiry = (application) => {
  let timetable = []
  switch(application.status) {
    case 'Ready to assign case officer':
    case 'Ready to validate':
      timetable.push(row({ key: 'Valid date', value: 'Not validated', action: { href: `/main/cases/${application.id}/validate`, text: 'Validate' }}))
      break
    case 'Ready to start':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: 'Not started', action: { href: `/main/cases/${application.id}/start-case`, text: 'Start' }}))

      if(application.procedure) {
        timetable.push(row({ key: 'LPA questionnaire due', value: 'Awaiting start date' }))
        timetable.push(row({ key: 'Statements due', value: 'Awaiting start date' }))
        timetable.push(row({ key: 'Interested party comments due', value: 'Awaiting start date' }))
        timetable.push(row({ key: 'Statement of common ground due', value: 'Not added', action: { href: `/main/cases/${application.id}/xyz`, text: 'Add' }}))
        timetable.push(row({ key: 'Proof of evidence and witnesses due', value: 'Not added', action: { href: `/main/cases/${application.id}/xyz`, text: 'Add' }}))
        timetable.push(row({ key: 'Planning obligation due', value: 'Not added', action: { href: `/main/cases/${application.id}/xyz`, text: 'Add' }}))
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
    case 'Awaiting LPAQ':
    case 'LPAQ ready to review':
    case 'Awaiting statements and IP comments':
    case 'Statements and IP comments ready to review':
    case 'Statements and IP comments ready to review':
    case 'Inquiry ready to set up':
      timetable.push(row({ key: 'Valid date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Start date', value: moment().format('D MMMM YYYY'), action: { href: `/main/cases/${application.id}/start-case`, text: 'Start' }}))
      timetable.push(row({ key: 'LPA questionnaire due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Statements due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))
      timetable.push(row({ key: 'Interested party comments due', value: moment().format('D MMMM YYYY'),  action: { href: `/main/cases/${application.id}/xyz`, text: 'Change' }}))

      timetable.push(row({ key: 'Statement of common ground due', value: 'Not added', action: { href: `/main/cases/${application.id}/xyz`, text: 'Add' }}))
      timetable.push(row({ key: 'Proof of evidence and witnesses due', value: 'Not added', action: { href: `/main/cases/${application.id}/xyz`, text: 'Add' }}))
      timetable.push(row({ key: 'Planning obligation due', value: 'Not added', action: { href: `/main/cases/${application.id}/xyz`, text: 'Add' }}))

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


      break
    case 'Awaiting proof of evidence and witnesses':
    case 'Proof of evidence and witnesses ready to review':
    case 'Proof of evidence and witnesses ready to share':
    case 'Awaiting inquiry':
    case 'Decision ready to issue':
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