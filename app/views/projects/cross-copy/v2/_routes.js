const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/share-comments-and-statements', function (req, res) {
  req.flash('success', 'Interested party comments and statements shared')
  res.redirect('case-statements')
})



// Add your routes above the module.exports line
module.exports = router
