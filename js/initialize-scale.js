'use strict';

window.initializeScale = (function () {
  var SCALE_INPUT_MIN = 25;
  var SCALE_INPUT_MAX = 100;
  var SCALE_INPUT_STEP = 25;

  return function (element, setScale) {
    var decButton = element.querySelector('.upload-resize-controls-button-dec');
    var incButton = element.querySelector('.upload-resize-controls-button-inc');
    var input = element.querySelector('.upload-resize-controls-value');

    incButton.addEventListener('click', onIncButtonPress);
    decButton.addEventListener('click', onDecButtonPress);

    function onIncButtonPress() {
      var scaleValue = parseInt(input.value, 10);

      if (scaleValue === SCALE_INPUT_MAX) {
        return;
      }

      scaleValue += SCALE_INPUT_STEP;
      setScale(scaleValue);
    }

    function onDecButtonPress() {
      var scaleValue = parseInt(input.value, 10);

      if (scaleValue === SCALE_INPUT_MIN) {
        return;
      }

      scaleValue -= SCALE_INPUT_STEP;
      setScale(scaleValue);
    }
  };
})();
