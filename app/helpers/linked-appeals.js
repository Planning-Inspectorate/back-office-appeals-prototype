function getLinkedAppeals(appealId, linkedAppeals) {
  const result = [];

  // Step 1: Check if this appeal is a child (find its lead)
  const leadEntry = linkedAppeals.find(entry => entry.childAppealId === appealId);

  if (leadEntry) {
      const leadId = leadEntry.leadAppealId;

      // Add the lead
      result.push({ id: leadId, relationship: 'Lead' });

      // Add all siblings (children of the same lead, excluding the current appeal)
      linkedAppeals
          .filter(entry => entry.leadAppealId === leadId && entry.childAppealId !== appealId)
          .forEach(entry => {
              result.push({ id: entry.childAppealId, relationship: 'Child' });
          });

      return result;
  }

  // Step 2: If the appeal is a lead, find all its children
  linkedAppeals
      .filter(entry => entry.leadAppealId === appealId)
      .forEach(entry => {
          result.push({ id: entry.childAppealId, relationship: 'Child' });
      });

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