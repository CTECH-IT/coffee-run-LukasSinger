(function (window) {
  let App = window.App || {};
  let $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) throw new Error("No selector provided!");
    this.$formElement = $(selector);
  }

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
