const _ = require('lodash')
const caseOfficers = require('../data/case-officers')

module.exports = router => {

  router.get('/main/appeals/:appealId/case-officer/edit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let caseOfficer
    if(_.get(req, 'session.data.editCaseOfficer.caseOfficer')) {
      caseOfficer = _.get(req, 'session.data.editCaseOfficer.caseOfficer')
    } else {
      caseOfficer = appeal.caseOfficer.name
    }

    let caseOfficerItems = caseOfficers.map(caseOfficer => ({ 
      text: `${caseOfficer.name} (${caseOfficer.emailAddress})`, 
      value: caseOfficer.name
    }))

    res.render('/main/appeals/case-officer/edit/index', {
      appeal,
      caseOfficer,
      caseOfficerItems
    })
  })

  router.post('/main/appeals/:appealId/case-officer/edit', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/case-officer/edit/check`)

  })

  router.get('/main/appeals/:appealId/case-officer/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let newCaseOfficer = caseOfficers.find(caseOfficer => caseOfficer.name == req.session.data.editCaseOfficer.caseOfficer)

    res.render('/main/appeals/case-officer/edit/check', {
      appeal,
      newCaseOfficer
    })
  })

  router.post('/main/appeals/:appealId/case-officer/edit/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let newCaseOfficer = caseOfficers.find(caseOfficer => caseOfficer.name == req.session.data.editCaseOfficer.caseOfficer)

    appeal.caseTeam = newCaseOfficer.caseTeam
    appeal.caseOfficer = newCaseOfficer
    delete req.session.data.editCaseOfficer
    req.flash('success', 'Case officer updated')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}