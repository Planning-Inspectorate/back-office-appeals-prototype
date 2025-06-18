const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/edit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id === req.params.partyId)

    let hasOrganisation = _.get(req, 'session.data.editRule6Party.hasOrganisation') || party.hasOrganisation
    let organisationName = _.get(req, 'session.data.editRule6Party.organisationName')  || party.organisationName

    res.render('/main/appeals/rule-6-parties/edit/organisation', {
      hasOrganisation,
      organisationName
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/edit', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/edit/name`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/edit/name', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id === req.params.partyId)

    let firstName = _.get(req, 'session.data.editRule6Party.firstName') || party.firstName
    let lastName = _.get(req, 'session.data.editRule6Party.lastName')  || party.lastName

    res.render('/main/appeals/rule-6-parties/edit/name', {
      appeal,
      firstName,
      lastName
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/edit/name', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/edit/email-address`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/edit/email-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id === req.params.partyId)

    let emailAddress = _.get(req, 'session.data.editRule6Party.emailAddress')  || party.emailAddress

    res.render('/main/appeals/rule-6-parties/edit/email-address', {
      appeal,
      emailAddress
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/edit/email-address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/edit/phone`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/edit/phone', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id === req.params.partyId)

    let phone = _.get(req, 'session.data.editRule6Party.phone')  || party.phone

    res.render('/main/appeals/rule-6-parties/edit/phone', {
      appeal,
      phone
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/edit/phone', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/edit/form`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/edit/form', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    res.render('/main/appeals/rule-6-parties/edit/form', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/edit/form', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/edit/due-dates`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/edit/due-dates', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id === req.params.partyId)

    let statementsDueDate
    if(_.get(req, 'session.data.editRule6Party.statementsDueDate')) {
      statementsDueDate = DateTime.fromObject({
        day: req.session.data.editRule6Party.statementsDueDate.day,
        month: req.session.data.editRule6Party.statementsDueDate.month,
        year: req.session.data.editRule6Party.statementsDueDate.year
      }).toISO()
    } else {
      statementsDueDate = party.statementsDueDate
    }

    let proofOfEvidenceAndWitnessesDueDate
    if(_.get(req, 'session.data.editRule6Party.proofOfEvidenceAndWitnessesDueDate')) {
      proofOfEvidenceAndWitnessesDueDate = DateTime.fromObject({
        day: req.session.data.editRule6Party.proofOfEvidenceAndWitnessesDueDate.day,
        month: req.session.data.editRule6Party.proofOfEvidenceAndWitnessesDueDate.month,
        year: req.session.data.editRule6Party.proofOfEvidenceAndWitnessesDueDate.year
      }).toISO()
    } else {
      proofOfEvidenceAndWitnessesDueDate = party.proofOfEvidenceAndWitnessesDueDate
    }


    res.render('/main/appeals/rule-6-parties/edit/due-dates', {
      appeal,
      statementsDueDate,
      proofOfEvidenceAndWitnessesDueDate
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/edit/due-dates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/edit/check`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id === req.params.partyId)
    res.render('/main/appeals/rule-6-parties/edit/check', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id === req.params.partyId)
    

    // Update party
    party.hasOrganisation = req.session.data.editRule6Party.hasOrganisation
    if(party.hasOrganisation == 'Yes') {
      party.organisationName = req.session.data.editRule6Party.organisationName
    }
    party.firstName = req.session.data.editRule6Party.firstName
    party.lastName = req.session.data.editRule6Party.lastName
    party.lastName = req.session.data.editRule6Party.lastName
    party.emailAddress = req.session.data.editRule6Party.emailAddress
    party.phone = req.session.data.editRule6Party.phone
    party.statementsDueDate = DateTime.fromObject({
      day: req.session.data.editRule6Party.statementsDueDate.day,
      month: req.session.data.editRule6Party.statementsDueDate.month,
      year: req.session.data.editRule6Party.statementsDueDate.year
    }).toISO()
    party.proofOfEvidenceAndWitnessesDueDate = DateTime.fromObject({
      day: req.session.data.editRule6Party.proofOfEvidenceAndWitnessesDueDate.day,
      month: req.session.data.editRule6Party.proofOfEvidenceAndWitnessesDueDate.month,
      year: req.session.data.editRule6Party.proofOfEvidenceAndWitnessesDueDate.year
    }).toISO(),

    req.flash('success', 'Rule 6 party updated')

    // Clear temporary form data
    delete req.session.data.editRule6Party

    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}`)
  })

}