'use strict';

window.initializeFilters = (function () {
  return function (filtersElement, cb) {
    filtersElement.addEventListener('click', onFilterElementClick);

    function onFilterElementClick(evt) {
      var target = evt.target;

      if (!target.value) {
        return;
      }

      cb(target.value);
    }
  };
})();
