module.exports = router => {

  router.get('/main/appeals/:caseId/share-timetable', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/share-timetable/index', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/share-timetable', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    appeal.timetableShared = true
    req.flash('success', 'Timetable shared')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}