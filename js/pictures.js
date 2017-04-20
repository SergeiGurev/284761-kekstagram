'use strict';

var NUMBER_PHOTOS = 25;
var KEY_CODE_ENTER = 13;
var KEY_CODE_ESC = 27;
var SCALE_INPUT_MIN = 25;
var SCALE_INPUT_MAX = 100;
var SCALE_INPUT_STEP = 25;
var DEFAULT_IMAGE_PREVIEW_CLASS = 'filter-image-preview';

var commentsAll = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content;
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
var photos = getPhotos(NUMBER_PHOTOS);
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

addPhotos(pictures, photos);
document.querySelector('.upload-overlay').classList.add('invisible');
galleryOverlayClose.addEventListener('click', onGalleryOverlayCloseClick);
galleryOverlayClose.addEventListener('keydown', onGalleryOverlayClosePress);
uploadImageFormInput.addEventListener('change', onChangeUploadInput);
uploadOverlayClose.addEventListener('click', onUploadOverlayClosePress);
uploadForm.addEventListener('submit', onUploadOverlaySubmit);
filtersPanel.addEventListener('click', onFilterControlClick);
incButton.addEventListener('click', onIncButtonPress);
decButton.addEventListener('click', onDecButtonPress);
uploadTextarea.addEventListener('invalid', onUploadTextareaInvalid);

function addPhotos(element, arrayPhotos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayPhotos.length; i++) {
    var photoElement = createPhotoElement(photos[i]);
    fragment.appendChild(photoElement);
  }

  element.appendChild(fragment);
}

function createPhotoElement(photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  var picture = photoElement.querySelector('a');
  var onPictureClick = function (evt) {
    evt.preventDefault();
    openGalleryOverlay(photo);
  };

  picture.addEventListener('click', onPictureClick);
  picture.setAttribute('tabindex', '1');
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture-likes').textContent = photo.likes;

  return photoElement;
}

function getPhotos(numberPhotos) {
  var arrayPhotos = [];

  for (var i = 0; i < numberPhotos; i++) {
    var randomLikes = Math.ceil(Math.random() * (200 - 15) + 15);
    var randomComments = getRandomComments();

    arrayPhotos[i] = {};
    arrayPhotos[i].url = 'photos/' + (i + 1) + '.jpg';
    arrayPhotos[i].likes = randomLikes;
    arrayPhotos[i].comments = randomComments;
  }

  return arrayPhotos;
}

function getRandomComments() {
  var comments = [];

  if (Math.random() < 0.5) {
    comments.push(commentsAll[Math.floor(Math.random() * commentsAll.length)]);
  }

  comments.push(commentsAll[Math.floor(Math.random() * commentsAll.length)]);

  return comments;
}

function onPopupEscPress(evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    closeGalleryOverlay();
  }
}

function openGalleryOverlay(photo) {
  galleryOverlay.classList.remove('invisible');
  galleryOverlay.querySelector('.gallery-overlay-image').src = photo.url;
  galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
  document.addEventListener('keydown', onPopupEscPress);
}

function closeGalleryOverlay() {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onPopupEscPress);
}

function onGalleryOverlayCloseClick() {
  closeGalleryOverlay();
}

function onGalleryOverlayClosePress(evt) {
  if (evt.keyCode === KEY_CODE_ENTER) {
    closeGalleryOverlay();
  }
}

function onUploadOverlayEscPress(evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    closeUploadOverlay();
  }
}

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
