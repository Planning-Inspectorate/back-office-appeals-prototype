const _ = require('lodash')
const caseOfficers = require('../data/case-officers')

module.exports = router => {

  router.get('/main/appeals/:appealId/case-officer/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let caseOfficerItems = caseOfficers.map(caseOfficer => ({ 
      text: `${caseOfficer.name} (${caseOfficer.emailAddress})`, 
      value: caseOfficer.name
    }))
    res.render('/main/appeals/case-officer/new/index', {
      appeal,
      caseOfficerItems
    })
  })

  router.post('/main/appeals/:appealId/case-officer/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/case-officer/new/check`)
  })

  router.get('/main/appeals/:appealId/case-officer/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let newCaseOfficer = caseOfficers.find(caseOfficer => caseOfficer.name == req.session.data.addCaseOfficer.caseOfficer)

    res.render('/main/appeals/case-officer/new/check', {
      appeal,
      newCaseOfficer
    })
  })

  router.post('/main/appeals/:appealId/case-officer/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let newCaseOfficer = caseOfficers.find(caseOfficer => caseOfficer.name == req.session.data.addCaseOfficer.caseOfficer)
    appeal.caseOfficer = newCaseOfficer

    if(appeal.status == 'Ready to assign case officer') {
      appeal.status = 'Ready to validate'
    }

    delete req.session.data.addCaseOfficer
    req.flash('success', 'Case officer assigned')
    res.redirect(`/main/appeals/${req.params.appealId}`)
  })

}