'use strict';

window.initializeFilters = (function () {
  var cb = null;

  return function (filtersElement, setFilter) {
    cb = setFilter;

    filtersElement.addEventListener('click', onFilterElementClick);
  };

  function onFilterElementClick(evt) {
    var target = evt.target;

    if (!target.value) {
      return;
    }

    if (typeof cb === 'function') {
      cb(target.value);
    }
  }
})();
