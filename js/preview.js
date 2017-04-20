'use strict';

(function () {
  var KEY_CODE_ENTER = 13;
  var KEY_CODE_ESC = 27;

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  window.openGalleryOverlay = function (photo) {
    galleryOverlay.classList.remove('invisible');
    galleryOverlay.querySelector('.gallery-overlay-image').src = photo.url;
    galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
    galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
    document.addEventListener('keydown', onPopupEscPress);
  };

  galleryOverlayClose.addEventListener('click', onGalleryOverlayCloseClick);
  galleryOverlayClose.addEventListener('keydown', onGalleryOverlayClosePress);

  function onPopupEscPress(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      closeGalleryOverlay();
    }
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
})();
