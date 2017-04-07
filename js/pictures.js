'use strict';

var NUMBER_PHOTOS = 25;

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

addPhotos(pictures, photos);
document.querySelector('.upload-overlay').classList.add('invisible');

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

  photoElement.querySelector('a').setAttribute('tabindex', '1');
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

pictures.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(evt);
});
pictures.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    openPopup(evt);
  }
});

galleryOverlayClose.addEventListener('click', function () {
  closePopup();
});
galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closePopup();
  }
});

function onPopupEscPress(evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
}

function openPopup(evt) {
  document.addEventListener('keydown', onPopupEscPress);

  var target = evt.target;

  while (target !== pictures) {
    if (target.tagName === 'A') {
      galleryOverlay.classList.remove('invisible');

      galleryOverlay.querySelector('.gallery-overlay-image').src
      = target.querySelector('img').src;
      galleryOverlay.querySelector('.likes-count').textContent
      = target.querySelector('.picture-likes').textContent;
      galleryOverlay.querySelector('.comments-count').textContent
      = target.querySelector('.picture-comments').textContent;
      return;
    }
    target = target.parentNode;
  }
}

function closePopup() {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onPopupEscPress);
}

var uploadImageForm = document.getElementById('upload-select-image');
var uploadImageFormInput = document.getElementById('upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadOverlayClose = document.getElementById('upload-cancel');
var uploadTextarea = uploadOverlay.querySelector('.upload-form-description');

uploadImageFormInput.addEventListener('change', function () {
  openUploadOverlay();
});

uploadOverlayClose.addEventListener('click', function () {
  closeUploadOverlay();
});

uploadTextarea.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.stopPropagation();
  }
});

function onUploadOverlayEscPress(evt) {
  if (evt.keyCode === 27) {
    closeUploadOverlay();
  }
}

function openUploadOverlay() {
  uploadImageForm.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');

  document.addEventListener('keydown', onUploadOverlayEscPress);
}

function closeUploadOverlay() {
  uploadImageForm.classList.remove('invisible');
  uploadOverlay.classList.add('invisible');

  document.removeEventListener('keydown', onUploadOverlayEscPress);
}
