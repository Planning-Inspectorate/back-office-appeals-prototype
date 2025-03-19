//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const appeals = require('./data/appeals.json')

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const flash = require('connect-flash')
router.use(flash())

router.all('*', (req, res, next) => {
	res.locals.referrer = req.query.referrer
  res.locals.path = req.path
  res.locals.protocol = req.protocol
  res.locals.hostname = req.hostname
  res.locals.query = req.query
  res.locals.flash = req.flash('success')[0]
  next()
})

router.get('/clear-data', function (req, res) {
	delete req.session.data
	req.session.data = {}
	req.session.data.appeals = appeals

	const redirectUrl = req.query.returnUrl || '/main/appeals'

	res.redirect(redirectUrl)
})


require('./routes/appeals')(router)
require('./routes/appeal')(router)
require('./routes/linked-appeals')(router)
require('./routes/linked-appeals--add')(router)
require('./routes/linked-appeals--delete')(router)
require('./routes/agent--add')(router)
require('./routes/agent--edit')(router)
require('./routes/agent--remove')(router)
require('./routes/start-case')(router)
require('./routes/add-procedure')(router)
require('./routes/edit-procedure')(router)
require('./routes/add-hearing')(router)
require('./routes/edit-hearing')(router)
require('./routes/cancel-hearing')(router)
require('./routes/add-hearing-estimates')(router)
require('./routes/edit-hearing-estimates')(router)
require('./routes/add-timetable-dates')(router)
require('./routes/add-inquiry')(router)
require('./routes/edit-inquiry')(router)
require('./routes/cancel-inquiry')(router)
require('./routes/add-inquiry-estimates')(router)
require('./routes/edit-inquiry-estimates')(router)
require('./routes/rule-6-parties')(router)
require('./routes/rule-6-party--add')(router)
require('./routes/rule-6-party')(router)
require('./routes/rule-6-party--edit')(router)
require('./routes/rule-6-party--approve')(router)
require('./routes/rule-6-party--reject')(router)
require('./routes/rule-6-party--withdraw')(router)
require('./routes/rule-6-statements')(router)
require('./routes/rule-6-statement')(router)
require('./routes/rule-6-statement--approve')(router)
require('./routes/rule-6-statement--reject')(router)
require('./routes/rule-6-statement--redact')(router)
require('./routes/rule-6-proof-of-evidence-and-witnesses--list')(router)
require('./routes/rule-6-proof-of-evidence-and-witnesses--details')(router)
require('./routes/rule-6-proof-of-evidence-and-witnesses--accept')(router)
require('./routes/rule-6-proof-of-evidence-and-witnesses--reject')(router)
require('./routes/edit-timetable-due-dates')(router)

// Timetable
// require('./routes/add-statement-of-common-ground-due-date')(router)
// require('./routes/add-proof-of-evidence-and-witnesses-due-date')(router)
// require('./routes/add-planning-obligation-due-date')(router)
// require('./routes/edit-statement-of-common-ground-due-date')(router)
// require('./routes/edit-proof-of-evidence-and-witnesses-due-date')(router)
// require('./routes/edit-planning-obligation-due-date')(router)
// require('./routes/share-timetable')(router)

//added for simple branching ++ https://github.com/abbott567/radio-button-redirect ++

// const radioButtonRedirect = require('radio-button-redirect')
router.use(function radioButtonRedirect(req, res, next) {
  const obj = Object.keys(req.body).length ? req.body : req.query;
  for (const k in obj) {
    const v = obj[k];
    if (typeof v == 'function' && v.includes('~')) {
      const parts = v.split('~');
      req.session.data[k] = parts[0];
      const href = parts[1];
      return res.redirect(href);
    }
  }
  next();
})

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

// LINKED APPEALS

router.get("/projects/linked-appeals/v2/link-to-appeal-parent", (req, res) => {
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
	if (req.session.data.appealid == "5176892") {
		delete req.session.data.unlinkappeal
		res.redirect(req.originalUrl.replace("link-to-appeal","link-appeal-horizon"))
	}
	else {
		delete req.session.data.unlinkappeal
		res.redirect(req.originalUrl.replace("link-to-appeal","link-appeal-details"))
	}
})

router.get("/projects/linked-appeals/v3/link-to-appeal", (req, res) => {
	if (req.session.data.appealid == "5176892") {
		delete req.session.data.unlinkappeal
		res.redirect(req.originalUrl.replace("link-to-appeal","link-appeal-reference"))
	}
	else {
		delete req.session.data.unlinkappeal
		res.redirect(req.originalUrl.replace("link-to-appeal","link-appeal-details"))
	}
})

// RELATED APPEALS

router.get("/projects/linked-appeals/v2/relate-appeal", (req, res) => {
	if (req.session.data.relappealid == "5176892") {
		delete req.session.data.unrelateappeal
		res.redirect(req.originalUrl.replace("relate-appeal","related-appeal-horizon"))
	}
	else {
		delete req.session.data.unrelateappeal
		res.redirect(req.originalUrl.replace("relate-appeal","related-appeal-details"))
	}
})

router.get("/projects/linked-appeals/v3/relate-appeal", (req, res) => {
	if (req.session.data.relappealid == "5176892") {
		delete req.session.data.unrelateappeal
		res.redirect(req.originalUrl.replace("relate-appeal","related-appeal-reference"))
	}
	else {
		delete req.session.data.unrelateappeal
		res.redirect(req.originalUrl.replace("relate-appeal","related-appeal-details"))
	}
})

// CHANGE APPEAL TYPE

router.get("/projects/change-appeal-type/v1/change-appeal-resubmit-process", (req, res) => {
	if (req.session.data.appealResubmit == "yes") {
		res.redirect(req.originalUrl.replace("change-appeal-resubmit-process","change-appeal-final-date"))
	}
	else {
		res.redirect(req.originalUrl.replace("change-appeal-resubmit-process","change-appeal-horizon-id"))
	}
})

router.get("/projects/change-appeal-type/v2/change-appeal-resubmit-process", (req, res) => {
	if (req.session.data.appealResubmit == "yes") {
		res.redirect(req.originalUrl.replace("change-appeal-resubmit-process","change-appeal-final-date"))
	}
	else {
		res.redirect(req.originalUrl.replace("change-appeal-resubmit-process","case-closed"))
	}
})

// CLOSING APPEALS

router.get("/projects/closing-cases/v1/close-case-process", (req, res) => {
	if (req.session.data.closeAppeal == "yes") {
		res.redirect(req.originalUrl.replace("close-case-process","confirm-case-closed"))
	}
	else {
		res.redirect(req.originalUrl.replace("close-case-process","case"))
	}
})

router.get("/projects/closing-cases/v1/change-appeal-resubmit-process", (req, res) => {
	if (req.session.data.appealResubmit == "yes") {
		res.redirect(req.originalUrl.replace("change-appeal-resubmit-process","change-appeal-final-date"))
	}
	else {
		res.redirect(req.originalUrl.replace("change-appeal-resubmit-process","case-closed"))
	}
})



