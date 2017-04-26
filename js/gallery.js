'use strict';

(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var LIMIT_NEW_PHOTOS = 10;

  var pictures = document.querySelector('.pictures');
  var filtersBlock = document.querySelector('.filters');
  var popularFilter = filtersBlock.querySelector('#filter-popular');
  var newFilter = filtersBlock.querySelector('#filter-new');
  var discussedFilter = filtersBlock.querySelector('#filter-discussed');
  var photos = [];

  document.querySelector('.upload-overlay').classList.add('invisible');
  window.load(URL, contentLoadHandler);

  function contentLoadHandler(data) {
    if (!data) {
      return;
    }

    photos = data;
    renderPhotos(photos);
    filtersBlock.classList.remove('hidden');
    initializeSorts();
  }

  function initializeSorts() {
    popularFilter.addEventListener('click', onPopularFilterClick);
    newFilter.addEventListener('click', onNewFilterClick);
    discussedFilter.addEventListener('click', onDiscussedFilterClick);
  }

  function onPopularFilterClick() {
    window.debounce(renderPhotos, photos);
  }

  function onNewFilterClick() {
    var newPhotos = [];

    for (var i = 0; i < LIMIT_NEW_PHOTOS; i++) {
      newPhotos[i] = randomPhoto();
    }

    window.debounce(renderPhotos, newPhotos);

    function randomPhoto() {
      var photo = photos[Math.floor(Math.random() * photos.length)];

      if (newPhotos.indexOf(photo) !== -1) {
        return randomPhoto();
      }

      return photo;
    }
  }

  function onDiscussedFilterClick() {
    var discussedPhotos = photos.slice();

    discussedPhotos.sort(function (a, b) {
      return (b.comments.length - a.comments.length);
    });

    window.debounce(renderPhotos, discussedPhotos);
  }

  function renderPhotos(arrayPhotos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrayPhotos.length; i++) {
      var photoElement = window.createPhotoElement(arrayPhotos[i]);
      fragment.appendChild(photoElement);
    }

    pictures.innerHTML = '';
    pictures.appendChild(fragment);
  }
})();
