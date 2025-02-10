const moment = require('moment')

module.exports = router => {

  router.get('/main/cases/:appealId/add-timetable-dates', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-timetable-dates/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-timetable-dates', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-timetable-dates/proof-of-evidence-and-witnesses-due-date`)
  })

  router.get('/main/cases/:appealId/add-timetable-dates/proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-timetable-dates/proof-of-evidence-and-witnesses-due-date', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-timetable-dates/proof-of-evidence-and-witnesses-due-date', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-timetable-dates/planning-obligation-due-date`)
  })

  router.get('/main/cases/:appealId/add-timetable-dates/planning-obligation-due-date', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-timetable-dates/planning-obligation-due-date', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-timetable-dates/planning-obligation-due-date', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/add-timetable-dates/check`)
  })

  router.get('/main/cases/:appealId/add-timetable-dates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/add-timetable-dates/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/add-timetable-dates/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    application.statementOfCommonGroundDueDate = moment({
      year: req.session.data.addTimetableDates.statementOfCommonGroundDueDate.year,
      month: req.session.data.addTimetableDates.statementOfCommonGroundDueDate.month - 1,
      day: req.session.data.addTimetableDates.statementOfCommonGroundDueDate.day}
    ).toISOString()

    application.proofOfEvidenceAndWitnessesDueDate = moment({
      year: req.session.data.addTimetableDates.proofOfEvidenceAndWitnessesDueDate.year,
      month: req.session.data.addTimetableDates.proofOfEvidenceAndWitnessesDueDate.month - 1,
      day: req.session.data.addTimetableDates.proofOfEvidenceAndWitnessesDueDate.day}
    ).toISOString()

    application.planningObligationDueDate = moment({
      year: req.session.data.addTimetableDates.planningObligationDueDate.year,
      month: req.session.data.addTimetableDates.planningObligationDueDate.month - 1,
      day: req.session.data.addTimetableDates.planningObligationDueDate.day}
    ).toISOString()

    req.flash('success', 'Timetable due dates added')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}