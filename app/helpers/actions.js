const getActions = (appeal) => {
  let actions = [];

  // If it's a child appeal, the only possible action is "Validate appeal" when status is "Ready to validate"
  if (appeal.isChildAppeal) {
    return appeal.status === "Ready to validate" 
      ? [{ text: "Validate appeal", href: "#" }] 
      : [];
  }

  if (appeal.status === "Ready to assign case officer") {
    actions.push({ text: "Assign case officer", href: "#" })
  } else if (appeal.status === "Ready to validate") {
    actions.push({ text: "Validate appeal", href: "#" })
  } else if (appeal.status === "Ready to start") {
    actions.push({ text: "Start case", href: `/main/appeals/${appeal.id}/start-case` })
  } else if (appeal.status === "LPAQ") {
    actions.push({ text: "Review LPAQ", href: "#" })
  } else if (appeal.status === "Statements and IP comments") {
    actions.push({ text: "Review statements", href: "#" })
    actions.push({ text: "Review IP comments", href: "#" })
    // actions.push({ text: "Share statements and IP comments", href: "#" })
  } else if (appeal.status === "Final comments") {
    actions.push({ text: "Review final comments", href: "#" })
    // actions.push({ text: "Share final comments", href: "#" })
  } else if (appeal.status === "Site visit ready to set up") {
    actions.push({ text: "Set up site visit", href: "#" })
  } else if (appeal.status === "Hearing ready to set up") {
    if(appeal?.hearing?.hasAddress == 'No') {
      actions.push({ text: "Add hearing address", href: `/main/appeals/${appeal.id}/edit-hearing/address` })
    } else {
      actions.push({ text: "Set up hearing", href: `/main/appeals/${appeal.id}/add-hearing` })
    }
  } else if (appeal.status === "Inquiry ready to set up") {

    if(appeal.inquiry) {
      if(appeal.inquiry.hasDays == 'No' && appeal.inquiry.hasAddress == 'No') {
        actions.push({ text: "Finish setting up the inquiry", href: `/main/appeals/${appeal.id}/edit-inquiry/has-days` })
      } else {
        if(appeal.inquiry.hasDays == 'No') {
          actions.push({ text: "Add expected number of days to carry out the inquiry", href: `/main/appeals/${appeal.id}/edit-inquiry/days` })
        } else {
          actions.push({ text: "Add inquiry address", href: `/main/appeals/${appeal.id}/edit-inquiry/address` })
        }
      }
    } else {
      actions.push({ text: "Set up inquiry", href: `/main/appeals/${appeal.id}/add-inquiry` })
    }
  }
  
  if (appeal.status === "Proof of evidence and witnesses") {
    if(appeal.appellantProofOfEvidenceAndWitnesses.status == 'Ready to review') {
      actions.push({ text: "Review appellant proof of evidence and witnesses", href: `/main/appeals/${appeal.id}/appellant-proof-of-evidence-and-witnesses` })
    }
    if(appeal.lpaProofOfEvidenceAndWitnesses.status == 'Ready to review') {
      actions.push({ text: "Review LPA proof of evidence and witnesses", href: `/main/appeals/${appeal.id}/lpa-proof-of-evidence-and-witnesses` })
    }  
    // actions.push({ text: "Share proof of evidence and witnesses", href: "#" })
  }

  if(appeal?.rule6Parties?.some(rule6Party => rule6Party.proofOfEvidenceAndWitnesses?.status === 'Ready to review')) {
    actions.push({ text: "Review Rule 6 proof of evidence and witnesses", href: `/main/appeals/${appeal.id}/rule-6-proof-of-evidence-and-witnesses` })
  }
  
  if(appeal.status === "Decision ready to issue") {
    actions.push({ text: "Issue decision", href: `/main/appeals/${appeal.id}/decision/new` })
  }
  
  if(appeal.status == 'Awaiting transfer') {
    actions.push({ text: "Mark as transferred", href: `/main/appeals/${appeal.id}/horizon-reference/new` })
  }

  if(!appeal?.appealForm?.residentialUnits) {
    // actions.push({ text: "Add number of residential units", href: `/main/appeals/${appeal.id}/residential-units/new` })
  }

  return actions
}

module.exports = {
  getActions
};
