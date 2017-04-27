'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var INTERVAL_PASS = 1;
  var INTERVAL_NOT_PASS = 0;
  var intervalStatus = INTERVAL_PASS;
  var currentPlaceCall;

  window.debounce = function (fun, arg, placeCall) {
    if (currentPlaceCall !== placeCall) {
      intervalStatus = INTERVAL_PASS;
    }
    if (intervalStatus === INTERVAL_NOT_PASS) {
      return;
    }

    fun(arg);
    intervalStatus = INTERVAL_NOT_PASS;
    currentPlaceCall = placeCall;

    setTimeout(function () {
      intervalStatus = INTERVAL_PASS;
    }, DEBOUNCE_INTERVAL);
  };
})();
