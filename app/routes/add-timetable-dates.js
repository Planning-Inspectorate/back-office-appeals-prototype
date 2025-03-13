const moment = require('moment')

module.exports = router => {

  router.get('/main/appeals/:appealId/add-timetable-dates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-timetable-dates/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-timetable-dates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-timetable-dates/proof-of-evidence-and-witnesses-due-date`)
  })

  router.get('/main/appeals/:appealId/add-timetable-dates/proof-of-evidence-and-witnesses-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-timetable-dates/proof-of-evidence-and-witnesses-due-date', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-timetable-dates/proof-of-evidence-and-witnesses-due-date', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-timetable-dates/planning-obligation-due-date`)
  })

  router.get('/main/appeals/:appealId/add-timetable-dates/planning-obligation-due-date', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-timetable-dates/planning-obligation-due-date', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-timetable-dates/planning-obligation-due-date', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/add-timetable-dates/check`)
  })

  router.get('/main/appeals/:appealId/add-timetable-dates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/add-timetable-dates/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/add-timetable-dates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    appeal.statementOfCommonGroundDueDate = moment({
      year: req.session.data.addTimetableDates.statementOfCommonGroundDueDate.year,
      month: req.session.data.addTimetableDates.statementOfCommonGroundDueDate.month - 1,
      day: req.session.data.addTimetableDates.statementOfCommonGroundDueDate.day}
    ).toISOString()

    appeal.proofOfEvidenceAndWitnessesDueDate = moment({
      year: req.session.data.addTimetableDates.proofOfEvidenceAndWitnessesDueDate.year,
      month: req.session.data.addTimetableDates.proofOfEvidenceAndWitnessesDueDate.month - 1,
      day: req.session.data.addTimetableDates.proofOfEvidenceAndWitnessesDueDate.day}
    ).toISOString()

    appeal.planningObligationDueDate = moment({
      year: req.session.data.addTimetableDates.planningObligationDueDate.year,
      month: req.session.data.addTimetableDates.planningObligationDueDate.month - 1,
      day: req.session.data.addTimetableDates.planningObligationDueDate.day}
    ).toISOString()

    req.flash('success', 'Timetable due dates added')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}