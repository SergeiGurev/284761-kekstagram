'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

  document.querySelector('.upload-overlay').classList.add('invisible');
  window.load(URL, createFragment);

  function createFragment(arrayPhotos) {
    var fragment = document.createDocumentFragment();

    if (!arrayPhotos) {
      return;
    }

    for (var i = 0; i < arrayPhotos.length; i++) {
      var photoElement = window.createPhotoElement(arrayPhotos[i]);
      fragment.appendChild(photoElement);
    }
    pictures.appendChild(fragment);
  }
})();
