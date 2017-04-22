'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content;

  window.addPhotos = function (element, arrayPhotos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrayPhotos.length; i++) {
      var photoElement = createPhotoElement(arrayPhotos[i]);
      fragment.appendChild(photoElement);
    }

    element.appendChild(fragment);
  };

  function createPhotoElement(photo) {
    var photoElement = pictureTemplate.cloneNode(true);
    var picture = photoElement.querySelector('a');
    var onPictureClick = function (evt) {
      evt.preventDefault();
      window.openGalleryOverlay(photo);
    };

    picture.addEventListener('click', onPictureClick);
    picture.setAttribute('tabindex', '1');
    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;

    return photoElement;
  }
})();
