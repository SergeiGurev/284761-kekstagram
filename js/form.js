'use strict';

(function () {
  var KEY_CODE_ESC = 27;
  var SCALE_INPUT_MIN = 25;
  var SCALE_INPUT_MAX = 100;
  var SCALE_INPUT_STEP = 25;
  var DEFAULT_IMAGE_PREVIEW_CLASS = 'filter-image-preview';

  var uploadImageForm = document.getElementById('upload-select-image');
  var uploadImageFormInput = document.getElementById('upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadForm = uploadOverlay.querySelector('.upload-form');
  var uploadOverlayClose = document.getElementById('upload-cancel');
  var filtersPanel = uploadOverlay.querySelector('.upload-filter-controls');
  var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
  var incButton = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var decButton = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var scaleInput = uploadOverlay.querySelector('.upload-resize-controls-value');
  var uploadTextarea = uploadOverlay.querySelector('.upload-form-description');
  var currentFilterClass;

  uploadImageFormInput.addEventListener('change', onChangeUploadInput);
  uploadOverlayClose.addEventListener('click', onUploadOverlayClosePress);
  uploadForm.addEventListener('submit', onUploadOverlaySubmit);
  filtersPanel.addEventListener('click', onFilterControlClick);
  incButton.addEventListener('click', onIncButtonPress);
  decButton.addEventListener('click', onDecButtonPress);
  uploadTextarea.addEventListener('invalid', onUploadTextareaInvalid);

  function onChangeUploadInput() {
    if (uploadImageFormInput.value !== '') {
      setDefaultUploadOverlay();
      uploadImageForm.classList.add('invisible');
      uploadOverlay.classList.remove('invisible');
      document.addEventListener('keydown', onUploadOverlayEscPress);
    }
  }

  function closeUploadOverlay() {
    uploadImageForm.classList.remove('invisible');
    uploadImageFormInput.value = '';
    uploadOverlay.classList.add('invisible');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  }

  function onUploadOverlayEscPress(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeUploadOverlay();
    }
  }

  function setDefaultUploadOverlay() {
    imagePreview.className = DEFAULT_IMAGE_PREVIEW_CLASS;
    setScaleImage(SCALE_INPUT_MAX);
    uploadTextarea.value = '';
    uploadTextarea.style.borderColor = '';
  }

  function onUploadOverlaySubmit(evt) {
    evt.preventDefault();
    closeUploadOverlay();
  }

  function onUploadOverlayClosePress() {
    closeUploadOverlay();
  }

  function onUploadTextareaInvalid() {
    uploadTextarea.style.borderColor = 'red';
  }

  function onFilterControlClick(evt) {
    var target = evt.target;

    if (target === filtersPanel) {
      return;
    }

    if (target.value !== 'none') {
      var newFilterClass = 'filter-' + target.value;
      imagePreview.classList.add(newFilterClass);
    }

    imagePreview.classList.remove(currentFilterClass);
    currentFilterClass = newFilterClass;
  }

  function onIncButtonPress() {
    var scaleValue = parseInt(scaleInput.value, 10);

    if (scaleValue === SCALE_INPUT_MAX) {
      return;
    }

    scaleValue += SCALE_INPUT_STEP;
    setScaleImage(scaleValue);
  }

  function onDecButtonPress() {
    var scaleValue = parseInt(scaleInput.value, 10);

    if (scaleValue === SCALE_INPUT_MIN) {
      return;
    }

    scaleValue -= SCALE_INPUT_STEP;
    setScaleImage(scaleValue);
  }

  function setScaleImage(scale) {
    scaleInput.value = scale + '%';
    imagePreview.setAttribute('style', 'transform: scale(' + (scale / 100) + ')');
  }
})();
