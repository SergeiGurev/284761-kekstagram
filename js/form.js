'use strict';

(function () {
  var KEY_CODE_ESC = 27;
  var SCALE_INPUT_MIN = 25;
  var SCALE_INPUT_MAX = 100;
  var SCALE_INPUT_STEP = 25;
  var DEFAULT_IMAGE_PREVIEW_CLASS = 'filter-image-preview';
  var BAND_VALUE_MAX = 450;
  var BAND_VALUE_MIN = 0;

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
  var filterBand = uploadOverlay.querySelector('.upload-filter-level');
  var filterPin = document.querySelector('.upload-filter-level-pin');
  var filterVal = document.querySelector('.upload-filter-level-val');

  uploadImageFormInput.addEventListener('change', onChangeUploadInput);
  uploadOverlayClose.addEventListener('click', onUploadOverlayClosePress);
  uploadForm.addEventListener('submit', onUploadOverlaySubmit);
  filtersPanel.addEventListener('click', onFilterControlClick);
  incButton.addEventListener('click', onIncButtonPress);
  decButton.addEventListener('click', onDecButtonPress);
  uploadTextarea.addEventListener('invalid', onUploadTextareaInvalid);
  filterPin.addEventListener('mousedown', onFilterPinMousedown);

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
    imagePreview.style.filter = '';
    uploadTextarea.value = '';
    uploadTextarea.style.borderColor = '';
    filterBand.classList.add('invisible');
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

    if (!target.value) {
      return;
    }

    filterBand.classList.add('invisible');
    imagePreview.style.filter = '';

    if (target.value !== 'none') {
      var newFilterClass = 'filter-' + target.value;
      imagePreview.classList.add(newFilterClass);
      filterPin.style.left = filterVal.style.width = BAND_VALUE_MAX + 'px';
      filterBand.classList.remove('invisible');
    }

    if (currentFilterClass !== newFilterClass) {
      imagePreview.classList.remove(currentFilterClass);
    }

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
    imagePreview.style.transform = 'scale(' + (scale / 100) + ')';
  }

  function onFilterPinMousedown(evt) {
    evt.preventDefault();

    var startCoord = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      var value = filterPin.offsetLeft - shift;

      startCoord = moveEvt.clientX;

      if (value >= BAND_VALUE_MIN && value <= BAND_VALUE_MAX) {
        filterPin.style.left = filterVal.style.width = value + 'px';
      }

      setFilterValue(value);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function setFilterValue(value) {
    var filter = currentFilterClass;
    filter = filter.slice(7);

    switch (filter) {
      case 'sepia':
        imagePreview.style.filter = 'sepia(' + (value / BAND_VALUE_MAX) + ')';
        break;
      case 'chrome':
        imagePreview.style.filter = 'grayscale(' + (value / BAND_VALUE_MAX) + ')';
        break;
      case 'marvin':
        imagePreview.style.filter = 'invert(' + (value * 100 / BAND_VALUE_MAX) + '%)';
        break;
      case 'phobos':
        imagePreview.style.filter = 'blur(' + (value * 3 / BAND_VALUE_MAX) + 'px)';
        break;
      case 'heat':
        imagePreview.style.filter = 'brightness(' + (value * 3 / BAND_VALUE_MAX) + ')';
        break;
    }
  }
})();
