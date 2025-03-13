module.exports = router => {

  router.get('/main/cases/:caseId/cancel-hearing', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/cancel-hearing/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/cancel-hearing', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
    delete _case.hearing
    req.flash('success', 'Hearing cancelled')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}