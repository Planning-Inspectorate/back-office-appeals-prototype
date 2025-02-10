const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:caseId/add-timetable-dates', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-timetable-dates/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-timetable-dates', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-timetable-dates/proof-of-evidence-and-witnesses-due-date`)
  })

  router.get('/main/cases/:caseId/add-timetable-dates/proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-timetable-dates/proof-of-evidence-and-witnesses-due-date', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-timetable-dates/proof-of-evidence-and-witnesses-due-date', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-timetable-dates/planning-obligation-due-date`)
  })

  router.get('/main/cases/:caseId/add-timetable-dates/planning-obligation-due-date', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-timetable-dates/planning-obligation-due-date', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-timetable-dates/planning-obligation-due-date', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/add-timetable-dates/check`)
  })

  router.get('/main/cases/:caseId/add-timetable-dates/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/add-timetable-dates/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/add-timetable-dates/check', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)

    _case.statementOfCommonGroundDueDate = moment({
      year: req.session.data.addTimetableDates.statementOfCommonGroundDueDate.year,
      month: req.session.data.addTimetableDates.statementOfCommonGroundDueDate.month - 1,
      day: req.session.data.addTimetableDates.statementOfCommonGroundDueDate.day}
    ).toISOString()

    _case.proofOfEvidenceAndWitnessesDueDate = moment({
      year: req.session.data.addTimetableDates.proofOfEvidenceAndWitnessesDueDate.year,
      month: req.session.data.addTimetableDates.proofOfEvidenceAndWitnessesDueDate.month - 1,
      day: req.session.data.addTimetableDates.proofOfEvidenceAndWitnessesDueDate.day}
    ).toISOString()

    _case.planningObligationDueDate = moment({
      year: req.session.data.addTimetableDates.planningObligationDueDate.year,
      month: req.session.data.addTimetableDates.planningObligationDueDate.month - 1,
      day: req.session.data.addTimetableDates.planningObligationDueDate.day}
    ).toISOString()

    req.flash('success', 'Timetable due dates added')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}