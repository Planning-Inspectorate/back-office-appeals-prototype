const baseStatusesStart = [
  'Ready to assign case officer',
  'Ready to validate',
  'Ready to start',
  'LPAQ'
]

const baseStatusesEnd = [
  'Decision ready to issue',
  'Decision issued',
  'Awaiting transfer to Horizon',
  'Transferred to Horizon',
  'Withdrawn'
]

const s78Statuses = [
  'Statements and IP comments'
]

const s78WrittenStatuses = [
  'Final comments',
  'Site visit ready to set up',
  'Awaiting site visit'
]

const s78HearingStatuses = [
  'Hearing ready to set up',
  'Awaiting hearing'
]

const s78InquiryStatuses = [
  'Inquiry ready to set up',
  'Proof of evidence and witnesses',
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