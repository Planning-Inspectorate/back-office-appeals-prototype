const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/interested-party-comments/:commentId/withdraw', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)

    res.render('/main/appeals/interested-party-comments/withdraw/index', {
      appeal,
      comment
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/:commentId/withdraw', function (req, res) {
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments/${req.params.commentId}/withdraw/check`)
  })

  router.get('/main/appeals/:appealId/interested-party-comments/:commentId/withdraw/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)

    res.render('/main/appeals/interested-party-comments/withdraw/check', {
      appeal,
      comment
    })
  })

  router.post('/main/appeals/:appealId/interested-party-comments/:commentId/withdraw/check', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)
    req.flash('success', 'Interested party comment withdrawn')
    comment.status = 'Withdrawn'
    comment.dateWithdrawn = new Date()
    res.redirect(`/main/appeals/${req.params.appealId}/interested-party-comments/${req.params.commentId}`)
  })

}