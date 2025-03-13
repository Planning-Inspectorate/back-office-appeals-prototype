const { v4: uuidv4 } = require('uuid')

module.exports = router => {

  router.get('/main/cases/:caseId/rule-6-parties/new', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    res.render('/main/cases/rule-6-parties/new/organisation', {
      _case
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/new', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/new/name`)
  })

  router.get('/main/cases/:caseId/rule-6-parties/new/name', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    res.render('/main/cases/rule-6-parties/new/name', {
      _case
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/new/name', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/new/email-address`)
  })

  router.get('/main/cases/:caseId/rule-6-parties/new/email-address', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    res.render('/main/cases/rule-6-parties/new/email-address', {
      _case
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/new/email-address', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/new/phone`)
  })

  router.get('/main/cases/:caseId/rule-6-parties/new/phone', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    res.render('/main/cases/rule-6-parties/new/phone', {
      _case
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/new/phone', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/new/form`)
  })

  router.get('/main/cases/:caseId/rule-6-parties/new/form', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    res.render('/main/cases/rule-6-parties/new/form', {
      _case
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/new/form', function (req, res) {
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties/new/check`)
  })

  router.get('/main/cases/:caseId/rule-6-parties/new/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)

    res.render('/main/cases/rule-6-parties/new/check', {
      _case
    })
  })

  router.post('/main/cases/:caseId/rule-6-parties/new/check', function (req, res) {
    let _case = req.session.data.appeals.find(_case => _case.id == req.params.caseId)
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

    if(!_case.rule6Parties) {
      _case.rule6Parties = []
    }

    _case.rule6Parties.push(newParty)
    res.redirect(`/main/cases/${req.params.caseId}/rule-6-parties`)
  })

}