(function (window) {
  "use strict";

  let App = window.App || {};
  let Validation = {
    isCompanyEmail: function (email) {
      return /.+@isd535\.org$/.test(email);
    },
    isNotStrongDecaf: function (order, strength) {
      return !(/decaf/.test(order) && strength >= 35);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
