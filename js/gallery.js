'use strict';

(function () {
  var pictures = document.querySelector('.pictures');

  document.querySelector('.upload-overlay').classList.add('invisible');
  window.addPhotos(pictures, window.photos);
})();
