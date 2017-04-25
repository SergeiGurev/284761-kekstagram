'use strict';

window.initializeScale = (function () {
  var VALUE_OBJECT_DEFAULT = {
    max: 100,
    min: 1,
    step: 1
  };

  return function (incElement, decElement, valueElement, cb, valueObject) {
    if (!valueObject) {
      valueObject = VALUE_OBJECT_DEFAULT;
    }

    incElement.addEventListener('click', onIncButtonPress);
    decElement.addEventListener('click', onDecButtonPress);

    function onIncButtonPress() {
      setValue(valueObject.max, valueObject.step);
    }

    function onDecButtonPress() {
      setValue(valueObject.min, -valueObject.step);
    }

    function setValue(limit, step) {
      var value = parseInt(valueElement.value, 10);

      if (value === limit) {
        return;
      }

      value += step;
      cb(value);
    }
  };
})();
