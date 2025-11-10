module.exports = router => {

  // SETUP SITE VISIT

router.post('/enhancements/site-visit/visit-type', function (req, res) {
    res.redirect('date-and-time-check')
  })

  router.post('/enhancements/site-visit/date-and-time-check', function (req, res) {
	const dateCheck = req.session.data['date-check']
	const type = req.session.data.setupVisit?.type // ✅ correct key
  
	console.log("Date check:", dateCheck)
	console.log("Type:", type) // 👈 debug output
  
	if (dateCheck === 'No') {
	  return res.redirect('check')
	}
  
	if (dateCheck === 'Yes' && type === 'Accompanied') {
	  return res.redirect('visit-date--accompanied')
	}
  
	if (dateCheck === 'Yes' && type === 'Unaccompanied') {
	  return res.redirect('visit-date--unaccompanied')
	}
  
	if (dateCheck === 'Yes' && type === 'Access required') {
	  return res.redirect('visit-date--access-required')
	}
  
	return res.redirect('visit-date--accompanied')
  })  

  router.post('/enhancements/site-visit/date-and-time-check', function (req, res) {
    res.redirect('check')
  })

  router.post('/enhancements/site-visit/visit-date--accompanied', function (req, res) {
    res.redirect('check-2')
  })

  router.post('/enhancements/site-visit/visit-date--unaccompanied', function (req, res) {
    res.redirect('check-3')
  })

  router.post('/enhancements/site-visit/visit-date--access-required', function (req, res) {
    res.redirect('check-3')
  })

  router.post('/enhancements/site-visit/check', function (req, res) {
    res.redirect('success')
  })

  router.post('/enhancements/site-visit/check-2', function (req, res) {
    res.redirect('success-2')
  })

  router.post('/enhancements/site-visit/check-3', function (req, res) {
    res.redirect('success-3')
  })


}