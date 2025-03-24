const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/interested-party-comments/:commentId/accept', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)

    res.render('/main/appeals/interested-party-comments/accept/index', {
      appeal,
      comment
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/:commentId/accept', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)
    comment.status = 'Accepted'
    comment.dateAccepted = new Date()
    req.flash('success', 'Interested party comment accepted')
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments`)
  })

}



