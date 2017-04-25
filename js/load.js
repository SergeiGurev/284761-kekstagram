'use strict';

(function () {
  window.load = function (url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.open('GET', url);
    xhr.send();

    function onXhrLoad() {
      if (xhr.status !== 200) {
        onErrorLoad('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }

      cb(xhr.response);
    }

    function onXhrError() {
      onErrorLoad('Произошла ошибка соединения');
    }
  };

  function onErrorLoad(errorMessage) {
    var node = document.createElement('div');

    node.classList.add('error-block');
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  }
})();
