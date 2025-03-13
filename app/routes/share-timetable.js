module.exports = router => {

  router.get('/main/appeals/:appealId/share-timetable', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/share-timetable/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/share-timetable', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    appeal.timetableShared = true
    req.flash('success', 'Timetable shared')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}