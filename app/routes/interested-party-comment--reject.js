const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/interested-party-comments/:commentId/reject', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)

    res.render('/main/appeals/interested-party-comments/reject/index', {
      appeal,
      comment
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/:commentId/reject', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments/${req.params.commentId}/reject/can-resubmit`)
  })

  router.get('/main/appeals/:appealId/interested-party-comments/:commentId/reject/can-resubmit', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)

    res.render('/main/appeals/interested-party-comments/reject/can-resubmit', {
      appeal,
      comment
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/:commentId/reject/can-resubmit', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments/${req.params.commentId}/reject/check`)
  })

  router.get('/main/appeals/:appealId/interested-party-comments/:commentId/reject/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)

    res.render('/main/appeals/interested-party-comments/reject/check', {
      appeal,
      comment
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/:commentId/reject/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)
    comment.status = 'Rejected'
    comment.dateRejected = new Date()
    req.flash('success', 'Interested party comment rejected')
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments`)
  })

}

