//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


//added for simple branching ++ https://github.com/abbott567/radio-button-redirect ++

const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

// Add your routes here


// Set a flag for if the proto is running locally
router.use('/', (req, res, next) => {
	res.locals.currentURL = req.url

	if (req.get('host').includes('localhost')) {
		res.locals.local = true
	}

	next()
})

// Import routes from different prototype folders
router.use("/:service/:prototype/v:version", (req, res, next) => {
	try {
		res.locals.location = `${req.params.service}/${req.params.prototype}/v${req.params.version}/`
		return require(`./views/${req.params.service}/${req.params.prototype}/v${req.params.version}/_routes`)(req, res, next)
	} catch (e) {
		next()
	}
})
router.use("/:service/v:version", (req, res, next) => {
	try {
		res.locals.location = `${req.params.service}/v${req.params.version}/`
		return require(`./views/${req.params.service}/v${req.params.version}/_routes`)(req, res, next)
	} catch (e) {
		next()
	}
})

router.get("/projects/linked-appeals/v2/link-to-appeal-parent", (req, res) => {
		delete req.session.data.search
		delete req.session.data.unlinkappeal
		res.redirect(req.originalUrl.replace("link-to-appeal-parent","link-appeal-parent"))
})

router.get("/projects/linked-appeals/v3/link-to-appeal-parent", (req, res) => {
	delete req.session.data.search
	delete req.session.data.unlinkappeal
	res.redirect(req.originalUrl.replace("link-to-appeal-parent","link-appeal-parent"))
})

router.get("/projects/linked-appeals/v1/link-to-appeal", (req, res) => {
	if (req.session.data.appealid == "horizon") {
		delete req.session.data.unlinkappeal
		res.redirect(req.originalUrl.replace("link-to-appeal","link-appeal-horizon"))
	}
	else {
		delete req.session.data.unlinkappeal
		res.redirect(req.originalUrl.replace("link-to-appeal","link-appeal-details"))
	}
})


router.get("/projects/linked-appeals/v2/link-to-appeal", (req, res) => {
	if (req.session.data.appealid == "horizon") {
		delete req.session.data.unlinkappeal
		res.redirect(req.originalUrl.replace("link-to-appeal","link-appeal-horizon"))
	}
	else {
		delete req.session.data.unlinkappeal
		res.redirect(req.originalUrl.replace("link-to-appeal","link-appeal-details"))
	}
})

router.get("/projects/linked-appeals/v2/relate-appeal", (req, res) => {
	if (req.session.data.relappealid == "horizon") {
		delete req.session.data.unrelateappeal
		res.redirect(req.originalUrl.replace("relate-appeal","related-appeal-horizon"))
	}
	else {
		delete req.session.data.unrelateappeal
		res.redirect(req.originalUrl.replace("relate-appeal","related-appeal-details"))
	}
})