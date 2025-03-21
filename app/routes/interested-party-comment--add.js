const { v4: uuidv4 } = require('uuid')

module.exports = router => {

  router.get('/main/appeals/:appealId/interested-party-comments/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/interested-party-comments/new/index', {
      appeal
    })
  })

  

  router.post('/main/appeals/:appealId/interested-party-comments/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = req.session.data.comment
    req.flash('success', 'Interested party comment added')

    // let newParty = {
    //   id: uuidv4(),
    //   dateReceived: new Date(),
    //   emailAddress: party.emailAddress,
    //   firstName: party.firstName,
    //   lastName: party.lastName,
    //   hasOrganisation: party.hasOrganisation,
    //   organisationName: party.organisationName,
    //   phone: party.phone,
    //   status: 'Ready to review'
    // }

    // if(!appeal.rule6Parties) {
    //   appeal.rule6Parties = []
    // }

    // appeal.rule6Parties.push(newParty)
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments`)
  })

}