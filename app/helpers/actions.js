const getActions = (_case) => {
  let actions = [];

  if (_case.status === "Ready to assign case officer") {
    actions.push({ text: "Assign case officer", href: "#" })
  } else if (_case.status === "Ready to validate") {
    actions.push({ text: "Validate case", href: "#" })
  } else if (_case.status === "Ready to start") {
    actions.push({ text: "Start case", href: `/main/cases/${_case.id}/start-case` })
  } else if (_case.status === "LPAQ ready to review") {
    actions.push({ text: "Review LPAQ", href: "#" })
  } else if (_case.status === "Statements and IP comments ready to review") {
    actions.push({ text: "Review statements and IP comments", href: "#" })
  } else if (_case.status === "Statements and IP comments ready to share") {
    actions.push({ text: "Share statements and IP comments", href: "#" })
  } else if (_case.status === "Final comments ready to review") {
    actions.push({ text: "Review final comments", href: "#" })
  } else if (_case.status === "Final comments ready to share") {
    actions.push({ text: "Share final comments", href: "#" })
  } else if (_case.status === "Site visit ready to set up") {
    actions.push({ text: "Set up site visit", href: "#" })
  } else if (_case.status === "Hearing ready to set up") {
    actions.push({ text: "Set up hearing", href: `/main/cases/${_case.id}/add-hearing` })
  } else if (_case.status === "Inquiry ready to set up") {
    actions.push({ text: "Set up inquiry", href: `/main/cases/${_case.id}/add-inquiry` })
  } else if (_case.status === "Proof of evidence and witnesses ready to review") {
    actions.push({ text: "Review proof of evidence and witnesses", href: "#" })
  } else if (_case.status === "Proof of evidence and witnesses ready to share") {
    actions.push({ text: "Share proof of evidence and witnesses", href: "#" })
  } else if (_case.status === "Decision ready to issue") {
    actions.push({ text: "Issue decision", href: "#" })
  }


  return actions
}

module.exports = {
  getActions
};
