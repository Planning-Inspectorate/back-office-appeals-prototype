const { v4: uuidv4 } = require('uuid')

module.exports = router => {

  router.get('/main/appeals/:appealId/interested-party-comments/new', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/interested-party-comments/new/index', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/new', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments/new/has-address`)
  })

  router.get('/main/appeals/:appealId/interested-party-comments/new/has-address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/interested-party-comments/new/has-address', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/new/has-address', function (req, res) {
    if(req.session.data.addInterestedPartyComment.hasAddress == 'Yes') {
      res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments/new/address`)
    } else {
      res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments/new/comment`)
    }
  })

  router.get('/main/appeals/:appealId/interested-party-comments/new/address', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/interested-party-comments/new/address', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/new/address', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments/new/comment`)
  })

  router.get('/main/appeals/:appealId/interested-party-comments/new/comment', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/interested-party-comments/new/comment', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/new/comment', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments/new/check`)
  })

  router.get('/main/appeals/:appealId/interested-party-comments/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    res.render('/main/appeals/interested-party-comments/new/check', {
      appeal
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/new/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = req.session.data.addInterestedPartyComment
    req.flash('success', 'Interested party comment added')

    let newComment = {
      id: uuidv4(),
      dateReceived: new Date(),
      firstName: comment.firstName,
      lastName: comment.lastName,
      emailAddress: comment.emailAddress,
      hasAddress: comment.hasAddress,
      address: comment.address,
      status: 'Ready to review'
    }

    if(!appeal.interestedPartyComments) {
      appeal.interestedPartyComments = []
    }

    appeal.interestedPartyComments.push(newComment)
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments`)
  })

}