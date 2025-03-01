module.exports = router => {

  router.get('/main/cases/:caseId/cancel-inquiry', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    res.render('/main/cases/cancel-inquiry/index', {
      _case
    })
  })

  router.post('/main/cases/:caseId/cancel-inquiry', function (req, res) {
    let _case = req.session.data.cases.find(_case => _case.id == req.params.caseId)
    delete _case.inquiry
    req.flash('success', 'Inquiry cancelled')
    res.redirect(`/main/cases/${req.params.caseId}`)
  })

}