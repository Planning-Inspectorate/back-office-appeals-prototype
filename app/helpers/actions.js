const getActions = (appeal) => {
  let actions = [];

  if (appeal.status === "Ready to assign case officer") {
    actions.push({ text: "Assign case officer", href: "#" })
  } else if (appeal.status === "Ready to validate") {
    actions.push({ text: "Validate appeal", href: "#" })
  } else if (appeal.status === "Ready to start") {
    actions.push({ text: "Start case", href: `/main/appeals/${appeal.id}/start-case` })
  } else if (appeal.status === "LPAQ ready to review") {
    actions.push({ text: "Review LPAQ", href: "#" })
  } else if (appeal.status === "Statements and IP comments ready to review") {
    actions.push({ text: "Review statements and IP comments", href: "#" })
  } else if (appeal.status === "Statements and IP comments ready to share") {
    actions.push({ text: "Share statements and IP comments", href: "#" })
  } else if (appeal.status === "Final comments ready to review") {
    actions.push({ text: "Review final comments", href: "#" })
  } else if (appeal.status === "Final comments ready to share") {
    actions.push({ text: "Share final comments", href: "#" })
  } else if (appeal.status === "Site visit ready to set up") {
    actions.push({ text: "Set up site visit", href: "#" })
  } else if (appeal.status === "Hearing ready to set up") {
    actions.push({ text: "Set up hearing", href: `/main/appeals/${appeal.id}/add-hearing` })
  } else if (appeal.status === "Inquiry ready to set up") {
    actions.push({ text: "Set up inquiry", href: `/main/appeals/${appeal.id}/add-inquiry` })
  } else if (appeal.status === "Proof of evidence and witnesses ready to review") {
    actions.push({ text: "Review proof of evidence and witnesses", href: "#" })
  } else if (appeal.status === "Proof of evidence and witnesses ready to share") {
    actions.push({ text: "Share proof of evidence and witnesses", href: "#" })
  } else if (appeal.status === "Decision ready to issue") {
    actions.push({ text: "Issue decision", href: "#" })
  }


  return actions
}

module.exports = {
  getActions
};
