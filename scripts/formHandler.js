(function (window) {
  let App = window.App || {};
  let $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) throw new Error("Oops! You forgot to provide a selector!");
    this.$formElement = $(selector);
    if (this.$formElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + selector
      );
    }
  }

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
