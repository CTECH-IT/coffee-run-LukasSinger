(function (window) {
  "use strict";
  let App = window.App || {};
  let data;

  function DataStore() {
    data = {};
  }

  DataStore.prototype.add = function (key, val) {
    data[key] = val;
  };

  DataStore.prototype.get = function (key) {
    return data[key];
  };

  DataStore.prototype.getAll = function () {
    return data;
  };

  DataStore.prototype.remove = function (key) {
    delete data[key];
  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
