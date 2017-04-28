'use strict';

(function () {
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  var LIMIT_NEW_PHOTOS = 10;
  var DEBOUNCE_INTERVAL = 500;

  var pictures = document.querySelector('.pictures');
  var filtersBlock = document.querySelector('.filters');
  var photos = [];
  var debounce = window.debounce(DEBOUNCE_INTERVAL);

  document.querySelector('.upload-overlay').classList.add('invisible');
  window.load(URL, contentLoadHandler);

  function contentLoadHandler(data) {
    if (!data) {
      return;
    }

    photos = data;
    renderPhotos(photos);
    filtersBlock.classList.remove('hidden');
    filtersBlock.addEventListener('click', onFiltersBlockClick);
  }

  function onFiltersBlockClick(evt) {
    var target = evt.target;

    switch (target.value) {
      case 'popular':
        debounce(renderPopularPhotos);
        break;
      case 'new':
        debounce(renderNewPhotos);
        break;
      case 'discussed':
        debounce(renderDiscussedPhotos);
    }
  }

  function renderPopularPhotos() {
    renderPhotos(photos);
  }

  function renderNewPhotos() {
    var newPhotos = [];

    for (var i = 0; i < LIMIT_NEW_PHOTOS; i++) {
      newPhotos[i] = randomPhoto();
    }

    renderPhotos(newPhotos);

    function randomPhoto() {
      var photo = photos[Math.floor(Math.random() * photos.length)];

      if (newPhotos.indexOf(photo) !== -1) {
        return randomPhoto();
      }

      return photo;
    }
  }

  function renderDiscussedPhotos() {
    var discussedPhotos = photos.slice();

    discussedPhotos.sort(function (a, b) {
      return (b.comments.length - a.comments.length);
    });

    renderPhotos(discussedPhotos);
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
