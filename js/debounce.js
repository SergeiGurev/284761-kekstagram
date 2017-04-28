'use strict';

(function () {
  window.debounce = function (interval) {
    var intervalPass = true;

    return function (fun) {
      if (!intervalPass) {
        event.preventDefault();
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
