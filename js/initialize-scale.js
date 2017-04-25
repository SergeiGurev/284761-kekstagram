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
      setValue(true);
    }

    function onDecButtonPress() {
      setValue();
    }

    function setValue(flag) {
      var value = parseInt(valueElement.value, 10);

      if (flag) {

        if (value === valueObject.max) {
          return;
        }

        (value += valueObject.step);
      } else {

        if (value === valueObject.min) {
          return;
        }

        (value -= valueObject.step);
      }

      cb(value);
    }
  };
})();
