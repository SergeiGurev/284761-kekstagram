'use strict';

window.createPicture = (function () {
  var pictureTemplate = document.querySelector('#picture-template').content;

  return function (photo) {
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
  };
})();
