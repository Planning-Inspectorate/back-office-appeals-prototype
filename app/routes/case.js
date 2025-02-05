
const { generateTimetable } = require('../helpers/timetable')

module.exports = router => {

  router.get('/main/cases/:appealId', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    let timetable = generateTimetable(application)

    const isCaseStarted = application.status !== 'Ready to assign case officer' && application.status !== 'Ready to validate' && application.status !== 'Ready to start'

    res.render('/main/cases/show', {
      application,
      timetable,
      isCaseStarted
    })
  })

}