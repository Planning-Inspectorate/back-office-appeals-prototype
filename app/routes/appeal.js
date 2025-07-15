
const { generateTimetable } = require('../helpers/timetable')
const { getActions } = require('../helpers/actions')
const { getLinkedAppeals, canAppealBeLinked, isLeadAppeal } = require('../helpers/linked-appeals')

module.exports = router => {

  router.get('/main/appeals/:appealId', function (req, res) {
    let appeal = req.session.data.appeals.find(appeal => appeal.id == req.params.appealId)

    let timetable = generateTimetable(appeal)

    if(appeal.isChildAppeal) {
      timetable.forEach(row => {
        delete row.actions
      })
    }

    let actions = getActions(appeal)
    const isCaseStarted = appeal.status !== 'Ready to assign case officer' && appeal.status !== 'Ready to validate' && appeal.status !== 'Ready to start'

    const linkedAppeals = getLinkedAppeals(appeal.id, req.session.data.linkedAppeals)
      // exclude ‘this appeal’
      .filter(linkedAppeal => linkedAppeal.id != appeal.id)
      .map(item => {
        let appeal = req.session.data.appeals.find(appeal => appeal.id == item.id)
        appeal.isLeadAppeal = isLeadAppeal(appeal.id, req.session.data.linkedAppeals)
        return appeal
      })

    const rule6Statements = appeal?.rule6Parties?.map(rule6Party => rule6Party.statement)
    const rule6ProofOfEvidenceAndWitnesses = appeal?.rule6Parties?.map(rule6Party => rule6Party.proofOfEvidenceAndWitnesses)

    const readyCount = rule6Statements.filter(
      statement => statement?.status === "Ready to review"
    ).length;

    const acceptedCount = rule6Statements.filter(
      statement => statement?.status === "Accepted"
    ).length;

    let rule6StatementsStatus = "No statements";
    let rule6StatementsLinkText = "View";

    if (readyCount > 0) {
      rule6StatementsStatus = `${readyCount} statement${readyCount > 1 ? 's' : ''} ready for review`;
      rule6StatementsLinkText = 'Review'
    } else if (acceptedCount > 0) {
      rule6StatementsStatus = `${acceptedCount} statement${acceptedCount > 1 ? 's' : ''}`;
      rule6StatementsLinkText = 'View'
    }

    // Proofs
    const proofsReadyCount = rule6ProofOfEvidenceAndWitnesses.filter(
      rule6ProofsOfEvidenceAndWitnesses => rule6ProofsOfEvidenceAndWitnesses?.status === "Ready to review"
    ).length;

    const proofsAcceptedCount = rule6ProofOfEvidenceAndWitnesses.filter(
      rule6ProofsOfEvidenceAndWitnesses => rule6ProofsOfEvidenceAndWitnesses?.status === "Accepted"
    ).length;

    let rule6ProofOfEvidenceAndWitnessesStatus = "No proof of evidence and witnesses";
    let rule6ProofOfEvidenceAndWitnessesLinkText = "View";

    if (proofsReadyCount > 0) {
      rule6ProofOfEvidenceAndWitnessesStatus = `${proofsReadyCount} proof${proofsReadyCount > 1 ? 's' : ''} of evidence and witnesses ready for review`;
      rule6ProofOfEvidenceAndWitnessesLinkText = 'Review'
    } else if (proofsAcceptedCount > 0) {
      rule6ProofOfEvidenceAndWitnessesStatus = `${proofsAcceptedCount} proof${proofsAcceptedCount > 1 ? 's' : ''} of evidence and witnesses`;
      rule6ProofOfEvidenceAndWitnessesLinkText = 'View'
    }

    

    const showAddLinkAppeal = canAppealBeLinked(appeal)

    res.render('/main/appeals/show', {
      appeal,
      timetable,
      actions,
      isCaseStarted,
      linkedAppeals,
      rule6Statements,
      rule6ProofOfEvidenceAndWitnesses,
      showAddLinkAppeal,
      rule6StatementsStatus,
      rule6StatementsLinkText,
      rule6ProofOfEvidenceAndWitnessesStatus,
      rule6ProofOfEvidenceAndWitnessesLinkText
    })
  })

}