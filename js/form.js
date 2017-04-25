'use strict';

(function () {
  var KEY_CODE_ESC = 27;
  var DEFAULT_IMAGE_PREVIEW_CLASS = 'filter-image-preview';
  var BAND_VALUE_MAX = 450;
  var BAND_VALUE_MIN = 0;
  var FILTER_CLASSES = {
    'sepia': 'filter-sepia',
    'chrome': 'filter-chrome',
    'marvin': 'filter-marvin',
    'phobos': 'filter-phobos',
    'heat': 'filter-heat'
  };
  var SCALE_INPUT_VALUES = {
    max: 100,
    min: 25,
    step: 25
  };

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
  var filterPin = filterBand.querySelector('.upload-filter-level-pin');
  var filterVal = filterBand.querySelector('.upload-filter-level-val');

  uploadImageFormInput.addEventListener('change', onUploadInputChange);
  uploadOverlayClose.addEventListener('click', onUploadOverlayClosePress);
  uploadForm.addEventListener('submit', onUploadOverlaySubmit);
  uploadTextarea.addEventListener('invalid', onUploadTextareaInvalid);
  filterPin.addEventListener('mousedown', onFilterPinMousedown);

  window.initializeScale(incButton, decButton, scaleInput, setScaleImage, SCALE_INPUT_VALUES);
  window.initializeFilters(filtersPanel, setFilterImage);

  function onUploadInputChange() {
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
    setScaleImage(SCALE_INPUT_VALUES.max);
    imagePreview.style.filter = '';
    uploadTextarea.value = '';
    uploadTextarea.style.borderColor = '';
    filterBand.classList.add('invisible');
    setPinPosition(BAND_VALUE_MAX);
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

  function setFilterImage(filter) {
    filterBand.classList.add('invisible');

    if (filter !== 'none') {
      var newFilterClass = FILTER_CLASSES[filter];
      imagePreview.classList.add(newFilterClass);
      filterBand.classList.remove('invisible');
    }

    if (currentFilterClass !== newFilterClass) {
      imagePreview.style.filter = '';
      setPinPosition(BAND_VALUE_MAX);
      imagePreview.classList.remove(currentFilterClass);
    }

    currentFilterClass = newFilterClass;
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
    setPinPosition(value);

    switch (currentFilterClass) {
      case FILTER_CLASSES['sepia']:
        imagePreview.style.filter = 'sepia(' + (value / BAND_VALUE_MAX) + ')';
        break;
      case FILTER_CLASSES['chrome']:
        imagePreview.style.filter = 'grayscale(' + (value / BAND_VALUE_MAX) + ')';
        break;
      case FILTER_CLASSES['marvin']:
        imagePreview.style.filter = 'invert(' + (value * 100 / BAND_VALUE_MAX) + '%)';
        break;
      case FILTER_CLASSES['phobos']:
        imagePreview.style.filter = 'blur(' + (value * 3 / BAND_VALUE_MAX) + 'px)';
        break;
      case FILTER_CLASSES['heat']:
        imagePreview.style.filter = 'brightness(' + (value * 3 / BAND_VALUE_MAX) + ')';
        break;
    }
  }

  function setPinPosition(value) {
    if (value >= BAND_VALUE_MIN && value <= BAND_VALUE_MAX) {
      filterPin.style.left = filterVal.style.width = value + 'px';
    }
  }
})();
