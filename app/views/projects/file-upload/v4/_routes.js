const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

console.log('*** V4 ROUTES FILE LOADED ***')
console.log('*** Router configured for: /projects/file-upload/v4/ ***')

// GET: Clear all session data and show upload page
router.get('/manage-documents/multiple-document-upload', function (req, res, next) {
  // Clear all uploaded files and session data for v4
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
  
  console.log('=== Cleared all v4 session data ===')
  next()
})

// GET: Show document details page (optionally filtered by fileId)
router.get('/manage-documents/document-details', function (req, res, next) {
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
router.post('/manage-documents/multiple-document-upload', function (req, res) {
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

  // Check if there are any files with unset metadata (whether newly uploaded or existing)
  const allFiles = req.session.data.uploadedFiles || []
  const nextPage = getNextRequiredPage(allFiles, req.session.data.shownPages)
  
  if (nextPage) {
    // Set the current file before redirecting so GET handler can use it
    const nextFile = getNextFileNeedingMetadata(allFiles)
    if (nextFile) {
      req.session.data.currentFile = nextFile
      
      // Set file number counter for sequential upload flow
      const currentSessionFiles = allFiles.filter(f => f.currentSession === true)
      const currentIndex = currentSessionFiles.findIndex(f => f.id === nextFile.id)
      req.session.data.currentFileNumber = currentIndex + 1
      req.session.data.totalFiles = currentSessionFiles.length
    }
  }
  
  if (nextPage === 'date-received') {
    return res.redirect('/projects/file-upload/v4/manage-documents/file-details-date-received')
  } else if (nextPage === 'redaction-status') {
    return res.redirect('/projects/file-upload/v4/manage-documents/file-details-redaction-status')
  } else {
    // All files complete - redirect to index
    return res.redirect('/projects/file-upload/v4/manage-documents/index')
  }
})

// GET: Show date received page with current file
router.get('/manage-documents/file-details-date-received', function (req, res, next) {
  console.log('=== Date received GET ===')
  const files = req.session.data.uploadedFiles || []
  console.log('Files in session:', files.length)
  
  // Check if editing a specific file via Change link
  const fileId = req.query.fileId
  let currentFile
  
  if (fileId) {
    // Find the specific file being edited (regardless of session)
    currentFile = files.find(f => f.id === fileId)
    console.log('Editing specific file with ID:', fileId)
    console.log('Found file:', currentFile ? currentFile.name : 'NOT FOUND')
    
    if (!currentFile) {
      console.log('File not found, redirecting to document-details')
      return res.redirect('/projects/file-upload/v4/manage-documents/document-details')
    }
    
    // Pre-populate form fields with existing values or today's date
    if (currentFile.dateReceived) {
      const dateParts = currentFile.dateReceived.split('/')
      req.session.data['document-date-day'] = dateParts[0] || ''
      req.session.data['document-date-month'] = dateParts[1] || ''
      req.session.data['document-date-year'] = dateParts[2] || ''
    } else {
      // Autofill with today's date
      const today = new Date()
      req.session.data['document-date-day'] = today.getDate().toString()
      req.session.data['document-date-month'] = (today.getMonth() + 1).toString()
      req.session.data['document-date-year'] = today.getFullYear().toString()
    }
    
    // Set current file and editing flag IMMEDIATELY
    req.session.data.currentFile = currentFile
    req.session.data.editingFileId = fileId
  } else {
    // Regular sequential flow - only current session files
    currentFile = getNextFileNeedingMetadata(files)
    console.log('Sequential flow - current file:', currentFile)
    
    // Initialize tracking
    if (!req.session.data.shownPages) {
      req.session.data.shownPages = {}
    }
    
    // If no file to process, redirect to document details
    if (!currentFile) {
      console.log('No file to process, redirecting to document-details')
      return res.redirect('/projects/file-upload/v4/manage-documents/document-details')
    }
    
    // Pre-populate form fields only if the file already has a date, otherwise use today's date
    if (currentFile.dateReceived) {
      const dateParts = currentFile.dateReceived.split('/')
      req.session.data['document-date-day'] = dateParts[0] || ''
      req.session.data['document-date-month'] = dateParts[1] || ''
      req.session.data['document-date-year'] = dateParts[2] || ''
    } else {
      // Autofill with today's date for new files
      const today = new Date()
      req.session.data['document-date-day'] = today.getDate().toString()
      req.session.data['document-date-month'] = (today.getMonth() + 1).toString()
      req.session.data['document-date-year'] = today.getFullYear().toString()
    }
    
    // Set current file for sequential flow
    req.session.data.currentFile = currentFile
  }
  
  // Only show file number counter in sequential upload flow, not when editing via Change link
  if (fileId) {
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
router.post('/manage-documents/file-details-date-received', function (req, res) {
  const files = req.session.data.uploadedFiles || []
  const editingFileId = req.session.data.editingFileId
  
  let currentFile
  if (editingFileId) {
    // Editing a specific file via Change link
    currentFile = files.find(f => f.id === editingFileId)
  } else {
    // Regular sequential flow
    currentFile = getNextFileNeedingMetadata(files)
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
        return res.redirect('/projects/file-upload/v4/manage-documents/file-details-date-received?fileId=' + editingFileId)
      } else {
        return res.redirect('/projects/file-upload/v4/manage-documents/file-details-date-received')
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
    return res.redirect('/projects/file-upload/v4/manage-documents/document-details')
  }

  // Regular flow: Check what this specific file needs next
  if (currentFile && !currentFile.redactionStatus) {
    const fileShownPages = req.session.data.shownPages[currentFile.id] || {}
    if (!fileShownPages.redactionStatus) {
      // Set current file in session before redirecting
      req.session.data.currentFile = currentFile
      const currentSessionFiles = files.filter(f => f.currentSession === true)
      const currentIndex = currentSessionFiles.findIndex(f => f.id === currentFile.id)
      req.session.data.currentFileNumber = currentIndex + 1
      req.session.data.totalFiles = currentSessionFiles.length
      
      // Clear redaction field so no radio is pre-selected
      req.session.data['redaction'] = ''
      
      return res.redirect('/projects/file-upload/v4/manage-documents/file-details-redaction-status')
    }
  }
  
  // Current file is complete or has been shown all pages, check for next file
  const nextFile = getNextFileNeedingMetadata(files)
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
  
  const nextPage = getNextRequiredPage(files, req.session.data.shownPages)
  if (nextPage === 'date-received') {
    return res.redirect('/projects/file-upload/v4/manage-documents/file-details-date-received')
  } else if (nextPage === 'redaction-status') {
    // Clear redaction field before showing redaction-status page
    req.session.data['redaction'] = ''
    return res.redirect('/projects/file-upload/v4/manage-documents/file-details-redaction-status')
  } else {
    // All files complete - redirect to index
    return res.redirect('/projects/file-upload/v4/manage-documents/index')
  }
})

// GET: Show redaction status page with current file
router.get('/manage-documents/file-details-redaction-status', function (req, res, next) {
  const files = req.session.data.uploadedFiles || []
  
  // Check if editing a specific file via Change link
  const fileId = req.query.fileId
  let currentFile
  
  if (fileId) {
    // Find the specific file being edited
    currentFile = files.find(f => f.id === fileId)
    if (!currentFile) {
      return res.redirect('/projects/file-upload/v4/manage-documents/document-details')
    }
    
    // Pre-populate redaction status with existing value
    if (currentFile.redactionStatus) {
      req.session.data['redaction'] = currentFile.redactionStatus
    } else {
      req.session.data['redaction'] = ''
    }
    
    // Set current file and editing flag IMMEDIATELY
    req.session.data.currentFile = currentFile
    req.session.data.editingFileId = fileId
  } else {
    // Regular flow - get next file needing metadata
    currentFile = getNextFileNeedingMetadata(files)
    
    // If no file to process, redirect to document details
    if (!currentFile) {
      console.log('No file to process, redirecting to document-details')
      return res.redirect('/projects/file-upload/v4/manage-documents/document-details')
    }

    // Clear redaction status for new file
    req.session.data['redaction'] = ''
    
    // Set current file for sequential flow
    req.session.data.currentFile = currentFile
  }
  
  // Only show file number counter in sequential upload flow, not when editing via Change link
  if (fileId) {
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
router.post('/manage-documents/file-details-redaction-status', function (req, res) {
  const files = req.session.data.uploadedFiles || []
  const editingFileId = req.session.data.editingFileId
  
  let currentFile
  if (editingFileId) {
    // Editing a specific file via Change link
    currentFile = files.find(f => f.id === editingFileId)
  } else {
    // Regular sequential flow
    currentFile = getNextFileNeedingMetadata(files)
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
    return res.redirect('/projects/file-upload/v4/manage-documents/document-details')
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
      
      return res.redirect('/projects/file-upload/v4/manage-documents/file-details-date-received')
    }
  }
  
  // Current file is complete or has been shown all pages, check for next file
  const nextFile = getNextFileNeedingMetadata(files)
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
  
  const nextPage = getNextRequiredPage(files, req.session.data.shownPages)
  if (nextPage === 'date-received') {
    return res.redirect('/projects/file-upload/v4/manage-documents/file-details-date-received')
  } else if (nextPage === 'redaction-status') {
    // Clear redaction field before showing redaction-status page
    req.session.data['redaction'] = ''
    return res.redirect('/projects/file-upload/v4/manage-documents/file-details-redaction-status')
  } else {
    // All files complete - redirect to index
    return res.redirect('/projects/file-upload/v4/manage-documents/index')
  }
})

// GET: Remove a file from the uploaded files list
router.get('/manage-documents/remove-file/:fileId', function (req, res) {
  const fileId = req.params.fileId
  console.log('Removing file with ID:', fileId)
  
  if (req.session.data.uploadedFiles) {
    req.session.data.uploadedFiles = req.session.data.uploadedFiles.filter(f => f.id !== fileId)
    console.log('Files remaining:', req.session.data.uploadedFiles.length)
  }
  
  // Redirect back to upload page
  return res.redirect('/projects/file-upload/v4/manage-documents/multiple-document-upload')
})

module.exports = router