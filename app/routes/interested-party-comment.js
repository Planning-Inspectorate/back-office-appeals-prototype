const _ = require('lodash')

module.exports = router => {

  router.get('/main/appeals/:appealId/interested-party-comments/:commentId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)
    let comment = appeal.interestedPartyComments.find(comment => comment.id == req.params.commentId)

    res.render('/main/appeals/interested-party-comments/show', {
      appeal,
      comment
    })
  })

}