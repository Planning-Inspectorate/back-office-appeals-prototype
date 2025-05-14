const baseStatusesStart = [
  'Ready to assign case officer',
  'Ready to validate',
  'Ready to start',
  'Awaiting LPAQ',
  'LPAQ ready to review'
]

const baseStatusesEnd = [
  'Decision ready to issue',
  'Decision issued',
  'Withdrawn'
]

const s78Statuses = [
  'Statements and IP comments open',
  'Statements and IP comments closed',
  'Statements and IP comments ready to share'
]

const s78WrittenStatuses = [
  'Final comments open',
  'Final comments closed',
  'Final comments ready to share',
  'Site visit ready to set up',
  'Awaiting site visit'
]

const s78HearingStatuses = [
  'Hearing ready to set up',
  'Awaiting hearing'
]

const s78InquiryStatuses = [
  'Inquiry ready to set up',
  'Proof of evidence and witnesses open',
  'Proof of evidence and witnesses closed',
  'Proof of evidence and witnesses ready to share',
  'Awaiting inquiry'
]

const allStatuses = [
  ...baseStatusesStart,
  ...s78Statuses,
  ...s78WrittenStatuses,
  ...s78HearingStatuses,
  ...s78InquiryStatuses,
  ...baseStatusesEnd
]

module.exports = {
  baseStatusesStart,
  baseStatusesEnd,
  s78Statuses,
  s78WrittenStatuses,
  s78HearingStatuses,
  s78InquiryStatuses,
  allStatuses
}