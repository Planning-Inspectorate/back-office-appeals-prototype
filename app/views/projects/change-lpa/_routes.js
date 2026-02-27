const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/lpa-name', (req, res) => {
	res.redirect('/projects/change-lpa/check-your-answers')
})

router.post('/check-your-answers', (req, res) => {
  res.redirect('/projects/change-lpa/case-details?success=local-planning-authority-updated')
})

router.get('/start', (req, res) => {
	delete req.session.data['lpa-name']
	delete req.session.data['lpa']
	delete req.session.data['appealReference']
	delete req.session.data['appeal-reference']
	res.redirect('/projects/change-lpa/case-details')
})

module.exports = router
