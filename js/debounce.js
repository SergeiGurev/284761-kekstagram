'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.debounce = function (fun, arg) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      fun(arg);
    }, DEBOUNCE_INTERVAL);
  };
})();
