const { v4: uuidv4 } = require('uuid')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-parties/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/rule-6-parties/new/organisation', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/new/name`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/new/name', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/rule-6-parties/new/name', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/new/name', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/new/email-address`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/new/email-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/rule-6-parties/new/email-address', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/new/email-address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/new/phone`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/new/phone', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/rule-6-parties/new/phone', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/new/phone', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/new/form`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/new/form', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/rule-6-parties/new/form', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/new/form', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/new/due-dates`)
  })


  router.get('/main/appeals/:appealId/rule-6-parties/new/due-dates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/rule-6-parties/new/due-dates', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/new/due-dates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/new/check`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/rule-6-parties/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = req.session.data.addRule6Party
    req.flash('success', 'Rule 6 party added')

    let newParty = {
      id: uuidv4(),
      dateAdded: new Date(),
      emailAddress: party.emailAddress,
      firstName: party.firstName,
      lastName: party.lastName,
      hasOrganisation: party.hasOrganisation,
      organisationName: party.organisationName,
      phone: party.phone,
      statementsDueDate: DateTime.fromObject({
        day: party.statementsDueDate.day,
        month: party.statementsDueDate.month,
        year: party.statementsDueDate.year
      }).toISO(),
      proofOfEvidenceAndWitnessesDueDate: DateTime.fromObject({
        day: party.proofOfEvidenceAndWitnessesDueDate.day,
        month: party.proofOfEvidenceAndWitnessesDueDate.month,
        year: party.proofOfEvidenceAndWitnessesDueDate.year
      }).toISO(),
      status: 'Active'
    }

    if(!appeal.rule6Parties) {
      appeal.rule6Parties = []
    }

    appeal.rule6Parties.push(newParty)
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties`)
  })

}