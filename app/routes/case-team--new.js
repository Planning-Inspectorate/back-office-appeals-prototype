const _ = require('lodash')
const caseTeams = require('../data/case-teams')

module.exports = router => {

  router.get('/main/appeals/:appealId/case-team/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let caseTeamItems = caseTeams.map(caseTeam => ({ 
      text: caseTeam.name, 
      value: caseTeam.name, 
      hint: {
        text: caseTeam.emailAddress
      }
    }))

    res.render('/main/appeals/case-team/new/index', {
      appeal,
      caseTeamItems
    })
  })

  router.post('/main/appeals/:appealId/case-team/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/case-team/new/check`)

  })

  router.get('/main/appeals/:appealId/case-team/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let newCaseTeam = caseTeams.find(caseTeam => caseTeam.name == req.session.data.addCaseTeam.caseTeam)

    res.render('/main/appeals/case-team/new/check', {
      appeal,
      newCaseTeam
    })
  })

  router.post('/main/appeals/:appealId/case-team/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let newCaseTeam = caseTeams.find(caseTeam => caseTeam.name == req.session.data.addCaseTeam.caseTeam)

    appeal.caseTeam = newCaseTeam
    delete req.session.data.addCaseOfficer
    req.flash('success', 'Case team assigned')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}