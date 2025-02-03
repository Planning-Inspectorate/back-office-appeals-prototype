module.exports = router => {

  router.get('/main/cases/:appealId/share-timetable', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    res.render('/main/cases/share-timetable/index', {
      application
    })
  })

  router.post('/main/cases/:appealId/share-timetable', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    application.timetableShared = true
    req.flash('success', 'Timetable shared')
    res.redirect(`/main/cases/${req.params.appealId}`)
  })

}