module.exports = router => {

  router.get('/main/appeals/:appealId/decision', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/decision/show', {
      appeal
    })
  })

}