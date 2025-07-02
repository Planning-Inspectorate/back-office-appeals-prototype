const _ = require('lodash')
const caseTeams = require('../data/case-teams')

module.exports = router => {

  router.get('/main/appeals/:appealId/case-team/edit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let caseTeam
    if(_.get(req, 'session.data.editCaseTeam.caseTeam')) {
      caseTeam = _.get(req, 'session.data.editCaseTeam.caseTeam')
    } else {
      caseTeam = appeal.caseTeam.name
    }

    let caseTeamItems = caseTeams.map(caseTeam => ({ 
      text: caseTeam.name, 
      value: caseTeam.name, 
      hint: {
        text: caseTeam.emailAddress
      }
    }))

    res.render('/main/appeals/case-team/edit/index', {
      appeal,
      caseTeam,
      caseTeamItems
    })
  })

  router.post('/main/appeals/:appealId/case-team/edit', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/case-team/edit/check`)

  })

  router.get('/main/appeals/:appealId/case-team/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let newCaseTeam = caseTeams.find(caseTeam => caseTeam.name == req.session.data.editCaseTeam.caseTeam)

    res.render('/main/appeals/case-team/edit/check', {
      appeal,
      newCaseTeam
    })
  })

  router.post('/main/appeals/:appealId/case-team/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let newCaseTeam = caseTeams.find(caseTeam => caseTeam.name == req.session.data.editCaseTeam.caseTeam)

    appeal.caseTeam = newCaseTeam
    delete req.session.data.editCaseOfficer
    req.flash('success', 'Case team updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}