module.exports = router => {

    router.post('/main/appeals/change-status/change-status', function (req, res) {
        const reviewDecision = req.body.reviewDecision
        if (reviewDecision === 'Incomplete') {
          res.redirect('appeal-incomplete-reason')
        } 
        else if (reviewDecision === 'Invalid') {
          res.redirect('appeal-invalid-reason')
        } else {
          res.redirect('valid-date')
        }
      })

}