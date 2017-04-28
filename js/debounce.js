'use strict';

(function () {
  var INTERVAL_PASS = 1;
  var INTERVAL_NOT_PASS = 0;
  var intervalStatus = INTERVAL_PASS;

  window.debounce = function (fun, arg, interval) {
    if (intervalStatus === INTERVAL_NOT_PASS) {
      event.preventDefault();
      return;
    }

    fun(arg);
    intervalStatus = INTERVAL_NOT_PASS;

    setTimeout(function () {
      intervalStatus = INTERVAL_PASS;
    }, interval);
  };
})();
