const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const generateLinkedAppeal = (params = {}) => {
  let linkedAppeal = {}

  linkedAppeal.id = uuidv4()
  linkedAppeal.leadAppealId = params.leadAppealId
  linkedAppeal.childAppealId = params.childAppealId

  return linkedAppeal
}

const generateLinkedAppeals = () => {
  const linkedAppeals = []

  // Not started
  linkedAppeals.push(generateLinkedAppeal({
    leadAppealId: '00000009',
    childAppealId: '00000010'
  }))

  linkedAppeals.push(generateLinkedAppeal({
    leadAppealId: '00000009',
    childAppealId: '00000182'
  }))

  // Ready to issue decision
  linkedAppeals.push(generateLinkedAppeal({
    leadAppealId: '00000015',
    childAppealId: '00000016'
  }))

  linkedAppeals.push(generateLinkedAppeal({
    leadAppealId: '00000015',
    childAppealId: '00000017'
  }))

  return linkedAppeals
}

const generateLinkedAppealsFile = (filePath) => {
  const linkedAppeals = generateLinkedAppeals()
  const filedata = JSON.stringify(linkedAppeals, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Linked appeals generated: ${filePath}`)
    }
  )
}

generateLinkedAppealsFile(path.join(__dirname, '../app/data/linked-appeals.json'))