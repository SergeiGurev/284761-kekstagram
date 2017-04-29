'use strict';

window.debounce = (function () {
  return function (interval) {
    var intervalPass = true;

    return function (fun, evt) {
      if (!intervalPass) {
        evt.preventDefault();
        return;
      }

      fun();
      intervalPass = false;

      setTimeout(function () {
        intervalPass = true;
      }, interval);
    };
  };
})();
