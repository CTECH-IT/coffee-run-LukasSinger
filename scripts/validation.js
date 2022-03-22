(function (window) {
  "use strict";

  let App = window.App || {};
  let Validation = {
    isCompanyEmail: function (email) {
      return /.+@isd535\.org$/.test(email);
    },
    isStrongDecaf: function (order, strength) {
      return !(/decaf/.test(order) && strength > 20);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
