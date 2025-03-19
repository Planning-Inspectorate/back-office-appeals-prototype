
const { generateTimetable } = require('../helpers/timetable')
const { getActions } = require('../helpers/actions')
const { getLinkedAppeals, isLeadAppeal, isChildAppeal } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/appeals/:appealId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let timetable = generateTimetable(appeal)
    let actions = getActions(appeal)
    const isCaseStarted = appeal.status !== 'Ready to assign case officer' && appeal.status !== 'Ready to validate' && appeal.status !== 'Ready to start'

    const linkedAppeals = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)



    const rule6Statements = appeal.rule6Parties?.map(rule6Party => rule6Party.statement)
    const rule6ProofOfEvidenceAndWitnesses = appeal.rule6Parties?.map(rule6Party => rule6Party.rule6ProofsOfEvidenceAndWitnesses)


    res.render('/main/appeals/show', {
      appeal,
      timetable,
      actions,
      isCaseStarted,
      isLeadAppeal: isLeadAppeal(appeal.id, req.session.data.linkedAppeals),
      isChildAppeal: isChildAppeal(appeal.id, req.session.data.linkedAppeals),
      linkedAppeals,
      rule6Statements,
      rule6ProofOfEvidenceAndWitnesses
    })
  })

}