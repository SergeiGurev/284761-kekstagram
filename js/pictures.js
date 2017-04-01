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
var photos = getPhotos(NUMBER_PHOTOS);

addPhotos(pictures, photos);
document.querySelector('.upload-overlay').classList.add('invisible');
showOverlay(photos[0]);

function showOverlay(photo) {
  galleryOverlay.classList.remove('invisible');
  galleryOverlay.querySelector('.gallery-overlay-image').src = photo.url;
  galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
}

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
    comments.push(commentsAll[Math.floor(Math.random() * 6)]);
  }

  comments.push(commentsAll[Math.floor(Math.random() * 6)]);

  return comments;
}
