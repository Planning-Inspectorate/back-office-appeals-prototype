//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

const initAccessibleAutocomplete = () => {
  if (!window.accessibleAutocomplete) {
    return
  }

  const selects = document.querySelectorAll('select.js-autocomplete')
  selects.forEach((select) => {
    if (select.dataset.autocompleteEnhanced === 'true') {
      return
    }

    window.accessibleAutocomplete.enhanceSelectElement({
      selectElement: select,
      inputClasses: 'govuk-input'
    })

    select.dataset.autocompleteEnhanced = 'true'
  })
}

// Multi file upload v5 
const initMultiDocumentUploadV5 = () => {
  const fileInput = document.getElementById('documents')
  const uploadArea = document.querySelector('.moj-multi-file-upload__upload')
  const tableBody = document.querySelector('#filesTable tbody')
  const filesTableGroup = document.getElementById('filesTableGroup')
  const filesTableError = document.getElementById('filesTableError')
  const form = uploadArea ? (uploadArea.closest('form') || document.querySelector('form')) : null

  if (!fileInput || !uploadArea || !tableBody || !form) {
    return
  }

  const uploadedFiles = []

  const showUploadingError = () => {
    const existingError = document.querySelector('.govuk-error-summary')
    if (existingError) {
      return
    }

    const errorSummary = document.createElement('div')
    errorSummary.className = 'govuk-error-summary'
    errorSummary.setAttribute('data-module', 'govuk-error-summary')
    errorSummary.setAttribute('role', 'alert')
    errorSummary.setAttribute('aria-labelledby', 'error-summary-title')
    errorSummary.style.cssText = 'border: 5px solid #d4351c; padding: 20px; margin-bottom: 20px; background-color: #f8f8f8;'

    errorSummary.innerHTML = `
      <h2 class="govuk-error-summary__title" id="error-summary-title" style="color: #d4351c; margin: 0 0 15px 0; font-size: 19px; font-weight: bold;">
        There is a problem
      </h2>
      <div class="govuk-error-summary__body">
        <ul class="govuk-list govuk-error-summary__list" style="margin: 0; padding-left: 20px;">
          <li><a href="#filesTable" style="color: #d4351c; text-decoration: underline;">Wait for all files to finish uploading</a></li>
        </ul>
      </div>
    `

    uploadArea.parentNode.insertBefore(errorSummary, uploadArea)
    errorSummary.scrollIntoView({ behavior: 'smooth', block: 'start' })

    if (filesTableGroup && filesTableError) {
      filesTableGroup.classList.add('govuk-form-group--error')
      filesTableError.style.display = 'block'
    }
  }

  const hideUploadingError = () => {
    const existingError = document.querySelector('.govuk-error-summary')
    if (existingError) {
      existingError.remove()
    }

    if (filesTableGroup && filesTableError) {
      filesTableGroup.classList.remove('govuk-form-group--error')
      filesTableError.style.display = 'none'
    }
  }

  const animateUpload = (row, index) => {
    let percent = 0
    const progressEl = row.querySelector('.progress-percent')

    const interval = setInterval(() => {
      percent++
      progressEl.textContent = percent + '%'

      if (percent >= 100) {
        clearInterval(interval)

        const fileName = row.dataset.file
        const fileId = row.dataset.fileId
        const fileSize = row.dataset.fileSize

        uploadedFiles.push({
          id: fileId,
          name: fileName,
          size: parseInt(fileSize, 10)
        })

        row.innerHTML = `
          <td class="govuk-table__cell">
            <a href="#" class="govuk-link">${fileName}</a>
          </td>
          <td class="govuk-table__cell">
            <strong class="govuk-tag govuk-tag--green">Uploaded</strong>
          </td>
          <td class="govuk-table__cell">
            <a href="#" class="govuk-link remove-link">Remove</a>
          </td>
        `

        const uploadingRows = document.querySelectorAll('.uploading-row')
        const stillUploading = Array.from(uploadingRows).some(r => {
          const progressEl = r.querySelector('.progress-percent')
          return progressEl && parseInt(progressEl.textContent, 10) < 100
        })

        if (!stillUploading) {
          hideUploadingError()
        }
      }
    }, 40 + index * 20)
  }

  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files)

    if (files.length === 0) {
      return
    }

    const fixedNames = ['receipt-1.pdf', 'receipt-2.pdf']
    tableBody.innerHTML = ''
    uploadedFiles.length = 0

    fixedNames.forEach((fixedName, index) => {
      const fileId = Date.now() + '-' + Math.random().toString(36).substr(2, 9)

      const row = document.createElement('tr')
      row.className = 'govuk-table__row uploading-row'
      row.dataset.file = fixedName
      row.dataset.fileId = fileId
      row.dataset.fileSize = 0

      row.innerHTML = `
        <td class="govuk-table__cell">
          ${fixedName}
        </td>
        <td class="govuk-table__cell">
          Uploading: <span class="progress-percent">0%</span>
        </td>
        <td class="govuk-table__cell">
          <a href="#" class="govuk-link">Cancel</a>
        </td>
      `

      tableBody.appendChild(row)
      animateUpload(row, index)
    })

    fileInput.value = ''
  })

  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault()
    uploadArea.style.borderColor = '#0b0c0c'
    uploadArea.style.backgroundColor = '#f8f8f8'
  })

  uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault()
    uploadArea.style.borderColor = '#b1b4b6'
    uploadArea.style.backgroundColor = '#ffffff'
  })

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault()
    uploadArea.style.borderColor = '#b1b4b6'
    uploadArea.style.backgroundColor = '#ffffff'

    const files = Array.from(e.dataTransfer.files)

    if (files.length === 0) {
      return
    }

    const fixedNames = ['receipt-1.pdf', 'receipt-2.pdf']
    tableBody.innerHTML = ''
    uploadedFiles.length = 0

    fixedNames.forEach((fixedName, index) => {
      const fileId = Date.now() + '-' + Math.random().toString(36).substr(2, 9)

      const row = document.createElement('tr')
      row.className = 'govuk-table__row uploading-row'
      row.dataset.file = fixedName
      row.dataset.fileId = fileId
      row.dataset.fileSize = 0

      row.innerHTML = `
        <td class="govuk-table__cell">
          ${fixedName}
        </td>
        <td class="govuk-table__cell">
          Uploading: <span class="progress-percent">0%</span>
        </td>
        <td class="govuk-table__cell">
          <a href="#" class="govuk-link">Cancel</a>
        </td>
      `

      tableBody.appendChild(row)
      animateUpload(row, index)
    })
  })

  document.addEventListener('click', (e) => {
    const link = e.target.closest('.govuk-link')

    if (!link) return

    const text = link.textContent.trim()

    if (text === 'Cancel' || text === 'Remove') {
      e.preventDefault()

      const row = link.closest('.govuk-table__row')

      if (row) {
        const fileId = row.dataset.fileId
        const index = uploadedFiles.findIndex(f => f.id === fileId)
        if (index > -1) {
          uploadedFiles.splice(index, 1)
        }
        row.remove()

        const uploadingRows = document.querySelectorAll('.uploading-row')
        const stillUploading = Array.from(uploadingRows).some(r => {
          const progressEl = r.querySelector('.progress-percent')
          return progressEl && parseInt(progressEl.textContent, 10) < 100
        })

        if (!stillUploading) {
          hideUploadingError()
        }
      }
    }
  })

  form.addEventListener('submit', (e) => {
    const uploadingRows = document.querySelectorAll('.uploading-row')
    const uploadingCount = Array.from(uploadingRows).filter(row => {
      const progressEl = row.querySelector('.progress-percent')
      return progressEl && parseInt(progressEl.textContent, 10) < 100
    }).length

    if (uploadingCount > 0) {
      e.preventDefault()
      showUploadingError()
      return
    }

    hideUploadingError()

    const fileDataInput = document.createElement('input')
    fileDataInput.type = 'hidden'
    fileDataInput.name = 'fileData'
    fileDataInput.value = JSON.stringify(uploadedFiles)
    form.appendChild(fileDataInput)
  })
}

window.GOVUKPrototypeKit.documentReady(() => {
  window.MOJFrontend.initAll()
  initAccessibleAutocomplete()
  initMultiDocumentUploadV5()
})

// Read more links
jQuery(function() {

  var shortening_text = $(".long-answers .govuk-summary-list__value, .long-answers .govuk-table__cell, .long-answers p");

  shortening_text.each(function() {
    var txt = $(this).html();
    if (txt.length < 500) return;
    $(this).html(
      txt.slice(0, 500) +
        '<span>... </span><a href="#" class="show">Read more</a>' +
        '<span style="display:none;">' +
        txt.slice(500, txt.length) +
        ' <a href="#" class="less">Read less</a></span>'
    );
  });

  $("a.show", shortening_text).click(function(event) {
    event.preventDefault();
    $(this)
      .hide()
      .prev()
      .hide();
    $(this)
      .next()
      .show();
  });

  $("a.less", shortening_text).click(function(event) {
    event.preventDefault();
    $(this)
      .parent()
      .hide()
      .prev()
      .show()
      .prev()
      .show();
  });
});


// Setup the MOJ multi file upload, we've made some minor changes to get things working
if(MOJFrontend.dragAndDropSupported() && MOJFrontend.formDataSupported() && MOJFrontend.fileApiSupported()) {
  MOJFrontend.MultiFileUpload = function(params) {
    this.defaultParams = {
      uploadFileEntryHook: $.noop,
      uploadFileExitHook: $.noop,
      uploadFileErrorHook: $.noop,
      fileDeleteHook: $.noop,
      uploadStatusText: 'Uploading files, please wait',
      dropzoneHintText: 'or drop files',
      dropzoneButtonText: 'Choose files'
    };

    this.params = $.extend({}, this.defaultParams, params);

    this.params.container.addClass('moj-multi-file-upload--enhanced');

    this.feedbackContainer = this.params.container.find('.moj-multi-file__uploaded-files');
    this.setupFileInput();
    if(!this.fileInput[0]) {
      return;
    }
    this.setupDropzone();
    this.setupLabel();
    this.setupStatusBox();
    this.params.container.on('click', '.moj-multi-file-upload__delete', $.proxy(this, 'onFileDeleteClick'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupDropzone = function() {
    this.fileInput.wrap('<div class="moj-multi-file-upload__dropzone" />');
    this.dropzone = this.params.container.find('.moj-multi-file-upload__dropzone');
    this.dropzone.on('dragover', $.proxy(this, 'onDragOver'));
    this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave'));
    this.dropzone.on('drop', $.proxy(this, 'onDrop'));
    this.feedbackContainer.addClass('moj-hidden');
  };

  MOJFrontend.MultiFileUpload.prototype.setupLabel = function() {
    this.label = $('<label for="'+this.fileInput[0].id+'" class="govuk-button govuk-button--secondary">'+ this.params.dropzoneButtonText +'</label>');
    this.dropzone.append(this.label);
    this.dropzone.append('<p class="govuk-body">' + this.params.dropzoneHintText + '</p>');
  };

  MOJFrontend.MultiFileUpload.prototype.setupFileInput = function() {
    this.fileInput = this.params.container.find('.moj-multi-file-upload__input');
    this.fileInput.on('change', $.proxy(this, 'onFileChange'));
    this.fileInput.on('focus', $.proxy(this, 'onFileFocus'));
    this.fileInput.on('blur', $.proxy(this, 'onFileBlur'));
  };

  MOJFrontend.MultiFileUpload.prototype.setupStatusBox = function() {
    this.status = $('<div aria-live="polite" role="status" class="govuk-visually-hidden" />');
    this.dropzone.append(this.status);
  };

  MOJFrontend.MultiFileUpload.prototype.onDragOver = function(e) {
    e.preventDefault();
    this.dropzone.addClass('moj-multi-file-upload--dragover');
  };

  MOJFrontend.MultiFileUpload.prototype.onDragLeave = function() {
    this.dropzone.removeClass('moj-multi-file-upload--dragover');
  };

  MOJFrontend.MultiFileUpload.prototype.onDrop = function(e) {
    e.preventDefault();
    this.dropzone.removeClass('moj-multi-file-upload--dragover');
    this.feedbackContainer.removeClass('moj-hidden').trigger('fileAdded');
    this.status.html(this.params.uploadStatusText);
    this.uploadFiles(e.originalEvent.dataTransfer.files);
  };

  MOJFrontend.MultiFileUpload.prototype.uploadFiles = function(files) {
    for(var i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  };

  MOJFrontend.MultiFileUpload.prototype.onFileChange = function(e) {
    this.feedbackContainer.removeClass('moj-hidden').trigger('fileAdded');
    this.status.html(this.params.uploadStatusText);
    this.uploadFiles(e.currentTarget.files);
    this.fileInput.replaceWith($(e.currentTarget).val('').clone(true));
    this.setupFileInput();
    this.fileInput.focus();
  };

  MOJFrontend.MultiFileUpload.prototype.onFileFocus = function(e) {
    this.label.addClass('moj-multi-file-upload--focused');
  };

  MOJFrontend.MultiFileUpload.prototype.onFileBlur = function(e) {
    this.label.removeClass('moj-multi-file-upload--focused');
  };

  MOJFrontend.MultiFileUpload.prototype.getSuccessHtml = function(success) {
    return '<span class="moj-multi-file-upload__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg> ' + success.messageHtml + '</span>';
  };

  MOJFrontend.MultiFileUpload.prototype.getErrorHtml = function(error) {
    return '<span class="moj-multi-file-upload__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg> '+ error.message +'</span>';
  };

  MOJFrontend.MultiFileUpload.prototype.getFileRowHtml = function(file) {
    var html = '';
    html += '<div class="govuk-summary-list__row moj-multi-file-upload__row">';
    html += '<dd class="govuk-summary-list__value moj-multi-file-upload__message">';
    html += '<span class="moj-multi-file-upload__filename">'+file.name+'</span>';
    html += '<span class="moj-multi-file-upload__progress">(0%)</span>';
//    html += '<p class="moj-multi-file-upload__details"><details class="govuk-details" data-module="govuk-details"><summary class="govuk-details__summary"><span class="govuk-details__summary-text">Add file details</span></summary><div class="govuk-details__text" id="includedContent">';
//    $(function(){
//      $("#includedContent").load("B-test/file-info.html");
//    });
//    html += '</div>';
//    html += '</p>';
    html += '</dd>';
    html += '<dd class="govuk-summary-list__actions moj-multi-file-upload__actions">';
    html += '<a class="remove-link moj-multi-file-upload__delete" href="#0" value="' + file.name + '">Remove <span class="govuk-visually-hidden">' + file.name + '</span></a>';
    html += '</dd>';
    html += '</div>';
    return html;
  };



  MOJFrontend.MultiFileUpload.prototype.uploadFile = function(file) {
    this.params.uploadFileEntryHook(this, file);
    var formData = new FormData();
    formData.append('documents', file);
    var item = $(this.getFileRowHtml(file));
    this.feedbackContainer.find('.moj-multi-file-upload__list').append(item);

    $.ajax({
      url: this.params.uploadUrl,
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success: $.proxy(function(response){
        if(response.error) {
          item.find('.moj-multi-file-upload__message').html(this.getErrorHtml(response.error));
          this.status.html(response.error.message);
        } else {
          item.find('.moj-multi-file-upload__message').html(this.getSuccessHtml(response.success));
          this.status.html(response.success.messageText);
        }
        this.params.uploadFileExitHook(this, file, response);
      }, this),
      error: $.proxy(function(jqXHR, textStatus, errorThrown) {
        this.params.uploadFileErrorHook(this, file, jqXHR, textStatus, errorThrown);
      }, this),
      xhr: function() {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', function(e) {
          if (e.lengthComputable) {
            var percentComplete = e.loaded / e.total;
            percentComplete = parseInt(percentComplete * 100, 10);
            item.find('.moj-multi-file-upload__progress').text(' (' + percentComplete + '%)');
          }
        }, false);
        return xhr;
      }
    });
  };

  MOJFrontend.MultiFileUpload.prototype.onFileDeleteClick = function(e) {
    e.preventDefault(); // if user refreshes page and then deletes
    var button = $(e.currentTarget);

    button.parents('.moj-multi-file-upload__row').remove();
    if(this.feedbackContainer.find('.moj-multi-file-upload__row').length === 0) {
      this.feedbackContainer.addClass('moj-hidden');
    }
  };
}

// Initialise MOJ multi file upload
if(typeof MOJFrontend.MultiFileUpload !== 'undefined') {
  new MOJFrontend.MultiFileUpload({
    container: $('.moj-multi-file-upload')
  });
}
