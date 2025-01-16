const { v4: uuidv4 } = require('uuid')

module.exports = router => {

  router.get('/main/cases/:appealId/rule-6-parties/new', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    res.render('/main/cases/rule-6-parties/new/organisation', {
      application
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/new', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/new/name`)
  })

  router.get('/main/cases/:appealId/rule-6-parties/new/name', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    res.render('/main/cases/rule-6-parties/new/name', {
      application
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/new/name', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/new/email-address`)
  })

  router.get('/main/cases/:appealId/rule-6-parties/new/email-address', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    res.render('/main/cases/rule-6-parties/new/email-address', {
      application
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/new/email-address', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/new/phone`)
  })

  router.get('/main/cases/:appealId/rule-6-parties/new/phone', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    res.render('/main/cases/rule-6-parties/new/phone', {
      application
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/new/phone', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/new/form`)
  })

  router.get('/main/cases/:appealId/rule-6-parties/new/form', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    res.render('/main/cases/rule-6-parties/new/form', {
      application
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/new/form', function (req, res) {
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties/new/check`)
  })

  router.get('/main/cases/:appealId/rule-6-parties/new/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)

    res.render('/main/cases/rule-6-parties/new/check', {
      application
    })
  })

  router.post('/main/cases/:appealId/rule-6-parties/new/check', function (req, res) {
    let application = req.session.data.applications.find(application => application.id == req.params.appealId)
    let party = req.session.data.addRule6Party
    req.flash('success', 'Rule 6 party added')

    let newParty = {
      id: uuidv4(),
      dateReceived: new Date(),
      emailAddress: party.emailAddress,
      firstName: party.firstName,
      lastName: party.lastName,
      hasOrganisation: party.hasOrganisation,
      organisationName: party.organisationName,
      phone: party.phone,
      status: 'Ready to review'
    }

    application.rule6Parties.push(newParty)
    res.redirect(`/main/cases/${req.params.appealId}/rule-6-parties`)
  })

}