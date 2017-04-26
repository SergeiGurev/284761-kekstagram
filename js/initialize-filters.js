'use strict';

window.initializeFilters = (function () {
  return function (filtersElement, setFilter) {
    filtersElement.addEventListener('click', onFilterElementClick);

    function onFilterElementClick(evt) {
      var target = evt.target;

      if (!target.value) {
        return;
      }

      setFilter(target.value);
    }
  };
})();
