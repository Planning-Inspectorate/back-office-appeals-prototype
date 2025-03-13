module.exports = router => {

  router.get('/main/appeals/:caseId/cancel-hearing', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    res.render('/main/appeals/cancel-hearing/index', {
      appeal
    })
  })

  router.post('/main/appeals/:caseId/cancel-hearing', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.caseId)
    delete appeal.hearing
    req.flash('success', 'Hearing cancelled')
    res.redirect(`/main/appeals/${req.params.caseId}`)
  })

}