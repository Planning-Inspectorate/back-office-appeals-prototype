module.exports = router => {

  router.post('/main/appeals/site-visit/missed/index', function(request, response) {
		response.redirect("/main/appeals/site-visit/missed/check")	
  })

  router.post('/main/appeals/site-visit/missed/check', function (req, res) {

    req.flash('success', 'Missed site visit recorded')
    res.redirect(`/main/appeals/00000016`)
  })

}
