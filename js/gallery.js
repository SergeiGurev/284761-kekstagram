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
  window.load(URL, onContentLoad);

  function onContentLoad(data) {
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
        debounce(renderPopularPhotos, evt);
        break;
      case 'new':
        debounce(renderNewPhotos, evt);
        break;
      case 'discussed':
        debounce(renderDiscussedPhotos, evt);
        break;
    }
  }

  function renderPopularPhotos() {
    renderPhotos(photos);
  }

  function renderNewPhotos() {
    var newPhotos = [];

    for (var i = 0; i < LIMIT_NEW_PHOTOS; i++) {
      newPhotos[i] = getRandomPhoto(newPhotos);
    }

    renderPhotos(newPhotos);
  }

  function getRandomPhoto(arrPhotos) {
    var photo = photos[Math.floor(Math.random() * photos.length)];

    return (arrPhotos.indexOf(photo) !== -1) ? getRandomPhoto(arrPhotos) : photo;
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

    arrayPhotos.forEach(function (it) {
      var photoElement = window.createPicture(it);
      fragment.appendChild(photoElement);
    });

    pictures.innerHTML = '';
    pictures.appendChild(fragment);
  }
})();
