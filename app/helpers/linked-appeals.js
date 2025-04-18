

function getLinkedAppeals(appealId, linkedAppeals) {
  const result = [];

  // if the appeal is a child
  if (isChildAppeal(appealId, linkedAppeals)) {
    const leadAppealId = linkedAppeals.find(linkedAppeal => linkedAppeal.childAppealId === appealId).leadAppealId

    // Add the lead
    result.push({ id: leadAppealId });

    // Add all siblings (which are the child appeals of the lead)
    linkedAppeals
      .filter(linkedAppeal => linkedAppeal.leadAppealId === leadAppealId)
      .forEach(linkedAppeal => {
        result.push({ id: linkedAppeal.childAppealId })
      })

    return result
  }

  // if the appeal is a lead
  linkedAppeals
    .filter(linkedAppeal => linkedAppeal.leadAppealId === appealId)
    .forEach(linkedAppeal => {
      result.push({ id: linkedAppeal.childAppealId })
    })

  return result;
}

function isLeadAppeal(appealId, linkedAppeals) {
  return typeof linkedAppeals.find(linkedAppeal => linkedAppeal.leadAppealId === appealId) !== 'undefined'
}

function isChildAppeal(appealId, linkedAppeals) {
  return typeof linkedAppeals.find(linkedAppeal => linkedAppeal.childAppealId === appealId) !== 'undefined'
}

function canAppealBeLinked(appeal) {
  return [
    'Ready to assign case officer', 
    'Ready to validate', 
    'Ready to start', 
    'Awaiting LPAQ', 
    'LPAQ ready to review'
  ].includes(appeal.status)
}

module.exports = {
  getLinkedAppeals,
  isLeadAppeal,
  isChildAppeal,
  canAppealBeLinked
}