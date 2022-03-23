(function (window) {
  "use strict";
  let App = window.App || {};
  let $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url)
      throw new Error(
        "No remote server URL provided! What am I supposed to do, send it to your grandma?"
      );
    this.url = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    $.post(this.url, val, function (res) {
      console.log(res);
    });
  };

  RemoteDataStore.prototype.get = function (key, func) {
    $.get(this.url + "?emailAddress=" + key, function (res) {
      console.log(res);
      func(res);
    });
  };

  RemoteDataStore.prototype.getAll = function (func) {
    $.get(this.url, function (res) {
      console.log(res);
      func(res);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    $.ajax(this.url + "?emailAddress=" + key, { type: "DELETE" });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
