const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const READY_WAIT_MS = 30 * 1000 // how long 'preparing'/'updating' lasts before flipping to 'ready'

router.post('/confirm-change', function (req, res) {
  req.flash('success', 'Procedure added')
  res.redirect('task-list?procedure=Written+representations+%28part+2%29')
})

router.get('/task-list', (req, res) => {
  const { zipstatus, started } = req.query
  const session = req.session.data

  session.zipstatus = zipstatus || ''

  if (!zipstatus) {
    return res.render('projects/download-case/v2/task-list')
  }

  if (zipstatus === 'preparing' || zipstatus === 'updating') {
    if (!started) {
      return res.redirect(`task-list?zipstatus=${zipstatus}&started=${Date.now()}`)
    }
    const elapsed = Date.now() - Number(started)
    if (elapsed >= READY_WAIT_MS) {
      return res.redirect('task-list?zipstatus=ready')
    }
  }

  res.render('projects/download-case/v2/task-list')
})

module.exports = router