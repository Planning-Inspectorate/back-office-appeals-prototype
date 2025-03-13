module.exports = router => {

  router.get('/main/cases/:caseId/share-timetable', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/share-timetable/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/share-timetable', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    _case.timetableShared = true
    req.flash('success', 'Timetable shared')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}