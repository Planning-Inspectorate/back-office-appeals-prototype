//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const appeals = require('./data/appeals.json')

const govukPrototypeKit = require('govuk-prototype-kit')

const {applyAzureHostingFix} = require('./azure-hosting-fix');
applyAzureHostingFix();

const router = govukPrototypeKit.requests.setupRouter()
const { isLeadAppeal, isChildAppeal } = require('../app/helpers/linked-appeals')

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

router.use('/main/appeals/:appealId*', (req, res, next) => {
  let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
  if(appeal) {
		appeal.isLeadAppeal = isLeadAppeal(appeal.id, req.session.data.linkedAppeals)
  	appeal.isChildAppeal = isChildAppeal(appeal.id, req.session.data.linkedAppeals)
  }
  next()
});

router.get('/clear-data', function (req, res) {
	delete req.session.data
	req.session.data = {}
	req.session.data.appeals = appeals

	const redirectUrl = req.query.returnUrl || '/main/appeals'

	res.redirect(redirectUrl)
})

router.get('/mode', function (req, res) {
	delete req.session.data
	req.session.data = {}
	req.session.data.appeals = appeals
	req.session.data.userType = req.query.userType

	// if(req.query.userType == 'caseOfficer') {
	// 	req.session.data.filters = {
  //   caseOfficers: ['Tony Stark']
  // }
	// } else {
	// 	req.session.data.filters = {
	// 		inspectors: ['Eli Morrow']
	// 	}
	// }

	res.redirect(req.query.returnUrl || '/main/your-appeals')
})


require('./routes/your-appeals')(router)
require('./routes/appeals')(router)
require('./routes/appeal')(router)
require('./routes/lpaq')(router)
require('./routes/appeal-form')(router)
require('./routes/activity')(router)
require('./routes/linked-appeals')(router)
require('./routes/linked-appeals--add')(router)
require('./routes/linked-appeals--delete')(router)
require('./routes/linked-appeals--edit-lead')(router)
require('./routes/agent--add')(router)
require('./routes/agent--edit')(router)
require('./routes/agent--remove')(router)
require('./routes/start-case')(router)
require('./routes/add-procedure')(router)
require('./routes/edit-procedure')(router)
require('./routes/edit-type')(router)
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

require('./routes/interested-party-comments')(router)
require('./routes/interested-party-comment--add')(router)
require('./routes/interested-party-comment')(router)
require('./routes/interested-party-comment--accept')(router)
require('./routes/interested-party-comment--redact')(router)
require('./routes/interested-party-comment--reject')(router)
require('./routes/interested-party-comment--withdraw')(router)

require('./routes/rule-6-parties')(router)
require('./routes/rule-6-party--add')(router)
require('./routes/rule-6-party')(router)
require('./routes/rule-6-party--edit')(router)
require('./routes/rule-6-party--edit-due-dates')(router)
require('./routes/rule-6-party--add-statement')(router)
require('./routes/rule-6-party--add-proof-of-evidence-and-witnesses')(router)
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

require('./routes/appellant-proof-of-evidence-and-witnesses')(router)
require('./routes/appellant-proof-of-evidence-and-witnesses--new')(router)
require('./routes/appellant-proof-of-evidence-and-witnesses--accept')(router)
require('./routes/appellant-proof-of-evidence-and-witnesses--reject')(router)

require('./routes/lpa-proof-of-evidence-and-witnesses')(router)
require('./routes/lpa-proof-of-evidence-and-witnesses--new')(router)
require('./routes/lpa-proof-of-evidence-and-witnesses--accept')(router)
require('./routes/lpa-proof-of-evidence-and-witnesses--reject')(router)

require('./routes/case-team--new')(router)
require('./routes/case-team--edit')(router)

require('./routes/case-officer--new')(router)
require('./routes/case-officer--edit')(router)

require('./routes/decision')(router)
require('./routes/decision--new')(router)
require('./routes/appellant-costs-decision--new')(router)
require('./routes/lpa-costs-decision--new')(router)

require('./routes/withdrawal')(router)
require('./routes/withdrawal--new')(router)

require('./routes/site-visit--new')(router)
require('./routes/site-visit--edit')(router)
require('./routes/site-visit--delete')(router)
require('./routes/site-visit--missed')(router)

require('./routes/horizon-reference--new')(router)
require('./routes/horizon-reference--edit')(router)

require('./routes/residential-units--new')(router)
require('./routes/residential-units--edit')(router)

require('./routes/cancel')(router)
require('./routes/invalid')(router)
require('./routes/invalid--new')(router)


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
