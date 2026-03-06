const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

console.log('*** V6 ROUTES FILE LOADED ***')
console.log('*** Router configured for: /projects/file-upload/v6/ ***')

// GET: Clear all session data and show upload page
router.get('/file-upload', function (req, res, next) {
  // Clear all uploaded files and session data for v6
  req.session.data.uploadedFiles = []
  req.session.data.currentFile = null
  req.session.data.editingFileId = null
  req.session.data.currentFileNumber = null
  req.session.data.totalFiles = null
  req.session.data.shownPages = {}
  req.session.data.fileId = null
  req.session.data['document-date-day'] = ''
  req.session.data['document-date-month'] = ''
  req.session.data['document-date-year'] = ''
  req.session.data['redaction'] = ''
  
  console.log('=== Cleared all v6 session data ===')
  next()
})

// GET: Show document details page (optionally filtered by fileId)
router.get('/document-details', function (req, res, next) {
  const fileId = req.query.fileId
  if (fileId) {
    req.session.data.fileId = fileId
  } else {
    req.session.data.fileId = null
  }
  next()
})

// Helper to get the next file needing metadata (only from current session)
function getNextFileNeedingMetadata(files) {
  if (!files || files.length === 0) return null
  const currentSessionFiles = files.filter(f => f.currentSession === true)
  return currentSessionFiles.find(f => !f.dateReceived || !f.redactionStatus)
}

// Helper to get current session files (fallback to all files if none flagged)
function getCurrentSessionFiles(files) {
  if (!files || files.length === 0) return []
  const currentSessionFiles = files.filter(f => f.currentSession === true)
  if (currentSessionFiles.length === 0 && files.length > 0) {
    files.forEach(file => {
      file.currentSession = true
    })
    return files
  }
  return currentSessionFiles
}

// Helper to get the next file missing a date received (only from current session)
function getNextFileMissingDate(files) {
  if (!files || files.length === 0) return null
  const currentSessionFiles = files.filter(f => f.currentSession === true)
  return currentSessionFiles.find(f => !f.dateReceived)
}

// Helper to get the next file missing a redaction status (only from current session)
function getNextFileMissingRedaction(files) {
  if (!files || files.length === 0) return null
  const currentSessionFiles = files.filter(f => f.currentSession === true)
  return currentSessionFiles.find(f => !f.redactionStatus)
}

// Helper to get current file index
function getCurrentFileIndex(files) {
  if (!files || files.length === 0) return -1
  const currentSessionFiles = files.filter(f => f.currentSession === true)
  return currentSessionFiles.findIndex(f => !f.dateReceived || !f.redactionStatus)
}

// Helper to check what the current file needs (only if not already shown)
function getNextRequiredPage(files, shownPages = {}) {
  const currentFile = getNextFileNeedingMetadata(files)
  if (!currentFile) return null
  
  const fileShownPages = shownPages[currentFile.id] || {}
  
  // Check what's missing and hasn't been shown yet
  if (!currentFile.dateReceived && !fileShownPages.dateReceived) {
    return 'date-received'
  } else if (!currentFile.redactionStatus && !fileShownPages.redactionStatus) {
    return 'redaction-status'
  }
  return null
}

// Helper to validate date received
function validateDateReceived(day, month, year) {
  const errors = []
  
  const monthNames = {
    'jan': 1, 'january': 1,
    'feb': 2, 'february': 2,
    'mar': 3, 'march': 3,
    'apr': 4, 'april': 4,
    'may': 5,
    'jun': 6, 'june': 6,
    'jul': 7, 'july': 7,
    'aug': 8, 'august': 8,
    'sep': 9, 'sept': 9, 'september': 9,
    'oct': 10, 'october': 10,
    'nov': 11, 'november': 11,
    'dec': 12, 'december': 12
  }
  
  let dayNum = null
  let monthNum = null
  let yearNum = null
  
  // Validate day
  if (day) {
    dayNum = parseInt(day, 10)
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
      errors.push({ field: 'day', message: 'Day must be a number between 1 and 31' })
    }
  }
  
  // Validate month
  if (month) {
    const monthLower = month.toLowerCase().trim()
    const monthNumParsed = parseInt(month, 10)
    
    if (!isNaN(monthNumParsed)) {
      // It's a number
      if (monthNumParsed < 1 || monthNumParsed > 12) {
        errors.push({ field: 'month', message: 'Month must be between 1 and 12' })
      } else {
        monthNum = monthNumParsed
      }
    } else if (monthNames[monthLower]) {
      // It's a valid month name
      monthNum = monthNames[monthLower]
    } else {
      // It's text but not a valid month name
      errors.push({ field: 'month', message: 'Enter a valid month name or number between 1 and 12' })
    }
  }
  
  // Validate year
  if (year) {
    yearNum = parseInt(year, 10)
    
    if (isNaN(yearNum)) {
      errors.push({ field: 'year', message: 'Year must be a number' })
    }
  }
  
  // If we have all parts and no errors so far, check if the date is in the future
  if (errors.length === 0 && dayNum && monthNum && yearNum) {
    // Create date object (month is 0-indexed in JS Date)
    const inputDate = new Date(yearNum, monthNum - 1, dayNum)
    const today = new Date()
    
    // Set time to start of day for fair comparison
    today.setHours(0, 0, 0, 0)
    inputDate.setHours(0, 0, 0, 0)
    
    if (inputDate > today) {
      errors.push({ field: 'year', message: 'Date cannot be in the future' })
    }
  }
  
  return errors
}

// POST: Handle multi-file upload submission
router.post('/file-upload', function (req, res) {
  console.log('===========================================')
  console.log('=== MULTIPLE DOCUMENT UPLOAD POST HIT ===')
  console.log('===========================================')
  console.log('Body:', req.body)
  console.log('fileData:', req.body.fileData)
  
  // Clear previous current file data
  req.session.data.currentFile = null
  req.session.data.editingFileId = null
  req.session.data.currentFileNumber = null
  req.session.data.totalFiles = null
  
  // Initialize storage
  if (!req.session.data.uploadedFiles) {
    req.session.data.uploadedFiles = []
  }

  // Mark all existing files as not current session
  req.session.data.uploadedFiles.forEach(file => {
    file.currentSession = false
  })
  
  // Clear shown pages tracking for new upload session
  req.session.data.shownPages = {}

  // Get file data from the form submission (simulated via hidden inputs from JS)
  const fileData = req.body.fileData
  
  if (fileData) {
    try {
      const files = JSON.parse(fileData)
      console.log('Parsed files:', files)
      files.forEach(file => {
        req.session.data.uploadedFiles.push({
          id: file.id,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          dateReceived: null,
          redactionStatus: null,
          currentSession: true
        })
      })
      console.log('Total uploaded files in session:', req.session.data.uploadedFiles.length)
    } catch (e) {
      console.error('Error parsing file data:', e)
    }
  } else {
    console.warn('No fileData in request body!')
  }

  if (req.session.data.uploadedFiles.length === 0) {
    const now = new Date().toISOString()
    const dummyFiles = ['receipt1.pdf', 'receipt2.pdf']
    dummyFiles.forEach((name) => {
      req.session.data.uploadedFiles.push({
        id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        name,
        size: 0,
        uploadedAt: now,
        dateReceived: null,
        redactionStatus: null,
        currentSession: true
      })
    })
    console.log('No file data found. Added dummy files:', dummyFiles)
  }

  // After Continue, route to single-or-multiple selection
  return res.redirect('/projects/file-upload/v6/date-received-single-or-multiple')
})

// POST: Handle date received single or multiple choice
router.post('/date-received-single-or-multiple', function (req, res) {
  const choice = req.session.data['dateReceivedBatchUpdate']

  if (choice === 'Yes') {
    return res.redirect('/projects/file-upload/v6/file-details-date-received-all')
  }

  // If entering individually, clear any previously stored dates for current session files
  const files = req.session.data.uploadedFiles || []
  const currentSessionFiles = getCurrentSessionFiles(files)
  currentSessionFiles.forEach(file => {
    file.dateReceived = null
    if (req.session.data.shownPages && req.session.data.shownPages[file.id]) {
      req.session.data.shownPages[file.id].dateReceived = false
    }
  })

  return res.redirect('/projects/file-upload/v6/file-details-date-received')
})

// POST: Handle redaction status single or multiple choice
router.post('/redaction-status-single-or-multiple', function (req, res) {
  const choice = req.session.data['redactionStatusBatchUpdate']

  if (choice === 'Yes') {
    return res.redirect('/projects/file-upload/v6/file-details-redaction-status-all')
  }

  // If entering individually, clear any previously stored redaction statuses for current session files
  const files = req.session.data.uploadedFiles || []
  const currentSessionFiles = getCurrentSessionFiles(files)
  currentSessionFiles.forEach(file => {
    file.redactionStatus = null
    if (req.session.data.shownPages && req.session.data.shownPages[file.id]) {
      req.session.data.shownPages[file.id].redactionStatus = false
    }
  })

  return res.redirect('/projects/file-upload/v6/file-details-redaction-status')
})

// GET: Show date received page for all files
router.get('/file-details-date-received-all', function (req, res, next) {
  const files = req.session.data.uploadedFiles || []
  const currentSessionFiles = getCurrentSessionFiles(files)

  if (currentSessionFiles.length === 0) {
    return res.redirect('/projects/file-upload/v6/document-details')
  }

  // Use a placeholder currentFile for display purposes
  req.session.data.currentFile = { name: 'All uploaded files' }

  // Pre-populate from the first file that has a date, otherwise use today's date
  const firstWithDate = currentSessionFiles.find(f => f.dateReceived)
  if (firstWithDate && firstWithDate.dateReceived) {
    const dateParts = firstWithDate.dateReceived.split('/')
    req.session.data['document-date-day'] = dateParts[0] || ''
    req.session.data['document-date-month'] = dateParts[1] || ''
    req.session.data['document-date-year'] = dateParts[2] || ''
  } else {
    const today = new Date()
    const dayOfWeek = today.getDay()

    if (dayOfWeek === 0) {
      today.setDate(today.getDate() - 2)
    } else if (dayOfWeek === 6) {
      today.setDate(today.getDate() - 1)
    }

    req.session.data['document-date-day'] = today.getDate().toString()
    req.session.data['document-date-month'] = (today.getMonth() + 1).toString()
    req.session.data['document-date-year'] = today.getFullYear().toString()
  }

  // Set example date (one month ago) for hint text
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  req.session.data.exampleDate = {
    day: oneMonthAgo.getDate(),
    month: oneMonthAgo.getMonth() + 1,
    year: oneMonthAgo.getFullYear()
  }

  next()
})

// POST: Capture date received for all files
router.post('/file-details-date-received-all', function (req, res) {
  const files = req.session.data.uploadedFiles || []
  const currentSessionFiles = getCurrentSessionFiles(files)

  if (currentSessionFiles.length === 0) {
    return res.redirect('/projects/file-upload/v6/document-details')
  }

  const day = req.session.data['document-date-day']
  const month = req.session.data['document-date-month']
  const year = req.session.data['document-date-year']

  if (day || month || year) {
    const validationErrors = validateDateReceived(day, month, year)

    if (validationErrors.length > 0) {
      req.session.data.dateErrors = validationErrors
      req.session.data.dateErrorList = validationErrors.map(error => ({
        text: error.message,
        href: '#document-date-' + error.field
      }))

      return res.redirect('/projects/file-upload/v6/file-details-date-received-all')
    }

    req.session.data.dateErrors = null
    req.session.data.dateErrorList = null
  }

  if (day || month || year) {
    const dateValue = [day, month, year].filter(Boolean).join('/')

    if (!req.session.data.shownPages) {
      req.session.data.shownPages = {}
    }

    currentSessionFiles.forEach(file => {
      file.dateReceived = dateValue

      if (!req.session.data.shownPages[file.id]) {
        req.session.data.shownPages[file.id] = {}
      }
      req.session.data.shownPages[file.id].dateReceived = true
    })
  }

  return res.redirect('/projects/file-upload/v6/redaction-status-single-or-multiple')
})
9
// GET: Show redaction status page for all files
router.get('/file-details-redaction-status-all', function (req, res, next) {
  const files = req.session.data.uploadedFiles || []
  const currentSessionFiles = getCurrentSessionFiles(files)

  if (currentSessionFiles.length === 0) {
    return res.redirect('/projects/file-upload/v6/document-details')
  }

  // Use a placeholder currentFile for display purposes
  req.session.data.currentFile = { name: 'All uploaded files' }

  // Pre-populate redaction status with existing value if all match, otherwise default
  const firstStatus = currentSessionFiles[0].redactionStatus
  const allSameStatus = currentSessionFiles.every(f => f.redactionStatus === firstStatus)

  if (allSameStatus && firstStatus) {
    req.session.data['redaction'] = firstStatus
  } else {
    req.session.data['redaction'] = 'No redaction required'
  }

  next()
})

// POST: Capture redaction status for all files
router.post('/file-details-redaction-status-all', function (req, res) {
  const files = req.session.data.uploadedFiles || []
  const currentSessionFiles = files.filter(f => f.currentSession === true)

  if (currentSessionFiles.length === 0) {
    return res.redirect('/projects/file-upload/v6/document-details')
  }

  if (!req.session.data.shownPages) {
    req.session.data.shownPages = {}
  }

  if (req.session.data['redaction']) {
    currentSessionFiles.forEach(file => {
      file.redactionStatus = req.session.data['redaction']

      if (!req.session.data.shownPages[file.id]) {
        req.session.data.shownPages[file.id] = {}
      }
      req.session.data.shownPages[file.id].redactionStatus = true
    })
  }

  return res.redirect('/projects/file-upload/v6/check-your-answers')
})

// GET: Show file uploading page with hardcoded files
// GET: Show date received page with current file
router.get('/file-details-date-received', function (req, res, next) {
  console.log('=== Date received GET ===')
  const files = req.session.data.uploadedFiles || []
  const currentSessionFiles = files.filter(f => f.currentSession === true)
  console.log('Files in session:', files.length)
  
  // Check if editing a specific file via Change link
  const fileId = req.query.fileId
  const fileIndex = req.query.fileIndex
  let currentFile

  // If not editing and all current session files already have dates, skip this page
  if (!fileId && fileIndex === undefined && currentSessionFiles.length > 0) {
    const allHaveDates = currentSessionFiles.every(f => f.dateReceived)
    if (allHaveDates) {
      return res.redirect('/projects/file-upload/v6/redaction-status-single-or-multiple')
    }
  }
  
  if (fileId || fileIndex !== undefined) {
    // Find the specific file being edited (regardless of session)
    currentFile = files.find(f => f.id === fileId)
    if (!currentFile && fileId) {
      currentFile = currentSessionFiles.find(f => f.id === fileId)
    }
    if (!currentFile && fileIndex !== undefined) {
      const indexNum = parseInt(fileIndex, 10)
      if (!isNaN(indexNum) && files[indexNum]) {
        currentFile = files[indexNum]
      } else if (!isNaN(indexNum) && currentSessionFiles[indexNum]) {
        currentFile = currentSessionFiles[indexNum]
      }
    }
    console.log('Editing specific file with ID:', fileId)
    console.log('Found file:', currentFile ? currentFile.name : 'NOT FOUND')
    
    if (!currentFile) {
      console.log('File not found, redirecting to document-details')
      if (req.query.from === 'check-answers' && currentSessionFiles.length > 0) {
        currentFile = currentSessionFiles[0]
      } else {
        return res.redirect('/projects/file-upload/v6/document-details')
      }
    }
    
    // Pre-populate form fields with existing values or today's date
    if (currentFile.dateReceived) {
      const dateParts = currentFile.dateReceived.split('/')
      req.session.data['document-date-day'] = dateParts[0] || ''
      req.session.data['document-date-month'] = dateParts[1] || ''
      req.session.data['document-date-year'] = dateParts[2] || ''
    } else {
      // Autofill with today's date or last business day if weekend
      const today = new Date()
      const dayOfWeek = today.getDay() // 0 = Sunday, 6 = Saturday
      
      if (dayOfWeek === 0) {
        // Sunday - use Friday
        today.setDate(today.getDate() - 2)
      } else if (dayOfWeek === 6) {
        // Saturday - use Friday
        today.setDate(today.getDate() - 1)
      }
      
      req.session.data['document-date-day'] = today.getDate().toString()
      req.session.data['document-date-month'] = (today.getMonth() + 1).toString()
      req.session.data['document-date-year'] = today.getFullYear().toString()
    }
    
    // Set current file and editing flag IMMEDIATELY
    req.session.data.currentFile = currentFile
    req.session.data.editingFileId = currentFile.id
  } else {
    // Regular sequential flow - only current session files
    currentFile = getNextFileMissingDate(files)
    console.log('Sequential flow - current file:', currentFile)
    
    // Initialize tracking
    if (!req.session.data.shownPages) {
      req.session.data.shownPages = {}
    }
    
    // If no file to process, redirect to document details
    if (!currentFile) {
      console.log('No file to process, redirecting to document-details')
      return res.redirect('/projects/file-upload/v6/document-details')
    }
    
    // Pre-populate form fields only if the file already has a date, otherwise use today's date
    if (currentFile.dateReceived) {
      const dateParts = currentFile.dateReceived.split('/')
      req.session.data['document-date-day'] = dateParts[0] || ''
      req.session.data['document-date-month'] = dateParts[1] || ''
      req.session.data['document-date-year'] = dateParts[2] || ''
    } else {
      // Autofill with today's date or last business day if weekend
      const today = new Date()
      const dayOfWeek = today.getDay() // 0 = Sunday, 6 = Saturday
      
      if (dayOfWeek === 0) {
        // Sunday - use Friday
        today.setDate(today.getDate() - 2)
      } else if (dayOfWeek === 6) {
        // Saturday - use Friday
        today.setDate(today.getDate() - 1)
      }
      
      req.session.data['document-date-day'] = today.getDate().toString()
      req.session.data['document-date-month'] = (today.getMonth() + 1).toString()
      req.session.data['document-date-year'] = today.getFullYear().toString()
    }
    
    // Set current file for sequential flow
    req.session.data.currentFile = currentFile
  }
  
  // Only show file number counter in sequential upload flow, not when editing via Change link
  if (fileId || fileIndex !== undefined) {
    // When editing specific file, don't show "X of Y" counter
    req.session.data.currentFileNumber = null
    req.session.data.totalFiles = null
  } else {
    // Sequential upload flow - show progress counter
    const currentSessionFiles = files.filter(f => f.currentSession === true)
    const currentIndex = currentSessionFiles.findIndex(f => f.id === currentFile.id)
    req.session.data.currentFileNumber = currentIndex + 1
    req.session.data.totalFiles = currentSessionFiles.length
  }
  
  console.log('Set currentFile:', req.session.data.currentFile ? req.session.data.currentFile.name : 'undefined')
  console.log('Set currentFileNumber:', req.session.data.currentFileNumber)
  
  // Set example date (one month ago) for hint text
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  req.session.data.exampleDate = {
    day: oneMonthAgo.getDate(),
    month: oneMonthAgo.getMonth() + 1,
    year: oneMonthAgo.getFullYear()
  }
  
  next()
})

// POST: Capture date received then determine next step
router.post('/file-details-date-received', function (req, res) {
  const files = req.session.data.uploadedFiles || []
  const editingFileId = req.session.data.editingFileId
  
  let currentFile
  if (editingFileId) {
    // Editing a specific file via Change link
    currentFile = files.find(f => f.id === editingFileId)
  } else {
    // Regular sequential flow
    currentFile = getNextFileMissingDate(files)
  }
  
  const day = req.session.data['document-date-day']
  const month = req.session.data['document-date-month']
  const year = req.session.data['document-date-year']
  
  // Validate the date if any fields are filled
  if (day || month || year) {
    const validationErrors = validateDateReceived(day, month, year)
    
    if (validationErrors.length > 0) {
      // Store errors in session for display, formatted for govukErrorSummary
      req.session.data.dateErrors = validationErrors
      req.session.data.dateErrorList = validationErrors.map(error => ({
        text: error.message,
        href: '#document-date-' + error.field
      }))
      
      // Redirect back to the date page with errors
      if (editingFileId) {
        return res.redirect('/projects/file-upload/v6/file-details-date-received?fileId=' + editingFileId)
      } else {
        return res.redirect('/projects/file-upload/v6/file-details-date-received')
      }
    }
    
    // Clear any previous errors
    req.session.data.dateErrors = null
    req.session.data.dateErrorList = null
  }
  
  if (currentFile) {
    if (day || month || year) {
      currentFile.dateReceived = [day, month, year].filter(Boolean).join('/')
      console.log('Set dateReceived for:', currentFile.name, '=', currentFile.dateReceived)
    }
    
    // Mark this page as shown for this file (only in sequential flow, not when editing)
    if (!editingFileId) {
      if (!req.session.data.shownPages[currentFile.id]) {
        req.session.data.shownPages[currentFile.id] = {}
      }
      req.session.data.shownPages[currentFile.id].dateReceived = true
    }
  }

  // Clear editing flag
  delete req.session.data.editingFileId

  // If we were editing a specific file, return to document details
  if (editingFileId) {
    return res.redirect('/projects/file-upload/v6/document-details')
  }

  // Current file is complete or has been shown all pages, check for next file
  const nextFile = getNextFileMissingDate(files)
  if (nextFile) {
    // Set the next file in session before redirecting
    req.session.data.currentFile = nextFile
    const currentSessionFiles = files.filter(f => f.currentSession === true)
    const currentIndex = currentSessionFiles.findIndex(f => f.id === nextFile.id)
    req.session.data.currentFileNumber = currentIndex + 1
    req.session.data.totalFiles = currentSessionFiles.length
  } else {
    // Clear file data if no more files to process
    req.session.data.currentFile = null
    req.session.data.currentFileNumber = null
    req.session.data.totalFiles = null
  }

  const currentSessionFiles = files.filter(f => f.currentSession === true)
  if (currentSessionFiles.length > 0 && currentSessionFiles.every(f => f.dateReceived)) {
    return res.redirect('/projects/file-upload/v6/redaction-status-single-or-multiple')
  }

  return res.redirect('/projects/file-upload/v6/file-details-date-received')
})

// GET: Show redaction status page with current file
router.get('/file-details-redaction-status', function (req, res, next) {
  const files = req.session.data.uploadedFiles || []
  const currentSessionFiles = files.filter(f => f.currentSession === true)
  
  // Check if editing a specific file via Change link
  const fileId = req.query.fileId
  const fileIndex = req.query.fileIndex
  let currentFile
  
  if (fileId || fileIndex !== undefined) {
    // Find the specific file being edited
    currentFile = files.find(f => f.id === fileId)
    if (!currentFile && fileId) {
      currentFile = currentSessionFiles.find(f => f.id === fileId)
    }
    if (!currentFile && fileIndex !== undefined) {
      const indexNum = parseInt(fileIndex, 10)
      if (!isNaN(indexNum) && files[indexNum]) {
        currentFile = files[indexNum]
      } else if (!isNaN(indexNum) && currentSessionFiles[indexNum]) {
        currentFile = currentSessionFiles[indexNum]
      }
    }
    if (!currentFile) {
      if (req.query.from === 'check-answers' && currentSessionFiles.length > 0) {
        currentFile = currentSessionFiles[0]
      } else {
        return res.redirect('/projects/file-upload/v6/document-details')
      }
    }
    
    // Pre-populate redaction status with existing value or default to "No redaction required"
    if (currentFile.redactionStatus) {
      req.session.data['redaction'] = currentFile.redactionStatus
    } else {
      req.session.data['redaction'] = 'No redaction required'
    }
    
    // Set current file and editing flag IMMEDIATELY
    req.session.data.currentFile = currentFile
    req.session.data.editingFileId = currentFile.id
  } else {
    // Regular flow - get next file missing redaction status
    currentFile = getNextFileMissingRedaction(files)
    
    // If no file to process, redirect to document details
    if (!currentFile) {
      console.log('No file to process, redirecting to document-details')
      return res.redirect('/projects/file-upload/v6/document-details')
    }

    // Set default redaction status for new file
    if (currentFile.redactionStatus) {
      req.session.data['redaction'] = currentFile.redactionStatus
    } else {
      req.session.data['redaction'] = 'No redaction required'
    }
    
    // Set current file for sequential flow
    req.session.data.currentFile = currentFile
  }
  
  // Only show file number counter in sequential upload flow, not when editing via Change link
  if (fileId || fileIndex !== undefined) {
    // When editing specific file, don't show "X of Y" counter
    req.session.data.currentFileNumber = null
    req.session.data.totalFiles = null
  } else {
    // Sequential upload flow - show progress counter
    const currentSessionFiles = files.filter(f => f.currentSession === true)
    const currentIndex = currentSessionFiles.findIndex(f => f.id === currentFile.id)
    req.session.data.currentFileNumber = currentIndex + 1
    req.session.data.totalFiles = currentSessionFiles.length
  }
  
  next()
})

// POST: Capture redaction status, then determine next step
router.post('/file-details-redaction-status', function (req, res) {
  const files = req.session.data.uploadedFiles || []
  const editingFileId = req.session.data.editingFileId
  
  let currentFile
  if (editingFileId) {
    // Editing a specific file via Change link
    currentFile = files.find(f => f.id === editingFileId)
  } else {
    // Regular sequential flow
    currentFile = getNextFileMissingRedaction(files)
  }
  
  if (currentFile && req.session.data['redaction']) {
    currentFile.redactionStatus = req.session.data['redaction']
    console.log('Set redactionStatus for:', currentFile.name, '=', currentFile.redactionStatus)
    
    // Mark this page as shown for this file (only in sequential flow, not when editing)
    if (!editingFileId) {
      if (!req.session.data.shownPages[currentFile.id]) {
        req.session.data.shownPages[currentFile.id] = {}
      }
      req.session.data.shownPages[currentFile.id].redactionStatus = true
    }
  }
  
  // Clear editing flag
  delete req.session.data.editingFileId

  // If we were editing a specific file, return to document details
  if (editingFileId) {
    return res.redirect('/projects/file-upload/v6/document-details')
  }

  // Regular flow: Check what this specific file needs next
  if (currentFile && !currentFile.dateReceived) {
    const fileShownPages = req.session.data.shownPages[currentFile.id] || {}
    if (!fileShownPages.dateReceived) {
      // Set current file in session before redirecting
      req.session.data.currentFile = currentFile
      const currentSessionFiles = files.filter(f => f.currentSession === true)
      const currentIndex = currentSessionFiles.findIndex(f => f.id === currentFile.id)
      req.session.data.currentFileNumber = currentIndex + 1
      req.session.data.totalFiles = currentSessionFiles.length
      
      return res.redirect('/projects/file-upload/v6/file-details-date-received')
    }
  }
  
  // Current file is complete or has been shown all pages, check for next file
  const nextFile = getNextFileMissingRedaction(files)
  if (nextFile) {
    // Set the next file in session before redirecting
    req.session.data.currentFile = nextFile
    const currentSessionFiles = files.filter(f => f.currentSession === true)
    const currentIndex = currentSessionFiles.findIndex(f => f.id === nextFile.id)
    req.session.data.currentFileNumber = currentIndex + 1
    req.session.data.totalFiles = currentSessionFiles.length
  } else {
    // Clear file data if no more files to process
    req.session.data.currentFile = null
    req.session.data.currentFileNumber = null
    req.session.data.totalFiles = null
  }
  
  if (nextFile) {
    // Clear redaction field before showing redaction-status page
    req.session.data['redaction'] = ''
    return res.redirect('/projects/file-upload/v6/file-details-redaction-status')
  }

  // All files complete - redirect to check-your-answers
  return res.redirect('/projects/file-upload/v6/check-your-answers')
})

// GET: Remove a file from the uploaded files list
router.get('/remove-file/:fileId', function (req, res) {
  const fileId = req.params.fileId
  console.log('Removing file with ID:', fileId)
  
  if (req.session.data.uploadedFiles) {
    req.session.data.uploadedFiles = req.session.data.uploadedFiles.filter(f => f.id !== fileId)
    console.log('Files remaining:', req.session.data.uploadedFiles.length)
  }
  
  // Redirect back to upload page
  return res.redirect('/projects/file-upload/v6/file-upload')
})

// GET: Show check your answers page
router.get('/check-your-answers', function (req, res, next) {
  const files = req.session.data.uploadedFiles || []
  const currentSessionFiles = files.filter(f => f.currentSession === true)
  
  req.session.data.uploadedFiles = currentSessionFiles
  
  next()
})

// POST: Continue from check your answers
router.post('/check-your-answers', function (req, res) {
  // Redirect to completion or next page
  return res.redirect('/projects/file-upload/v6/document-details')
})

module.exports = router
