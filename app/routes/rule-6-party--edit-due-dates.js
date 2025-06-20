const _ = require('lodash')
const { DateTime } = require("luxon")

module.exports = router => {

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/edit-due-dates', function (req, res) {
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


    res.render('/main/appeals/rule-6-parties/edit-due-dates/index', {
      appeal,
      party,
      statementsDueDate,
      proofOfEvidenceAndWitnessesDueDate
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/edit-due-dates', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}/edit-due-dates/check`)
  })

  router.get('/main/appeals/:appealId/rule-6-parties/:partyId/edit-due-dates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id === req.params.partyId)
    res.render('/main/appeals/rule-6-parties/edit-due-dates/check', {
      appeal,
      party
    })
  })

  router.post('/main/appeals/:appealId/rule-6-parties/:partyId/edit-due-dates/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let party = appeal.rule6Parties.find(party => party.id === req.params.partyId)
    
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

    req.flash('success', 'Rule 6 party due dates updated')

    // Clear temporary form data
    delete req.session.data.editRule6Party

    res.redirect(`/main/appeals/${req.params.appealId}/rule-6-parties/${req.params.partyId}`)
  })

}