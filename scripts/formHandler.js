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

  FormHandler.prototype.addSubmitHandler = function (func) {
    this.$formElement.on("submit", (e) => {
      e.preventDefault();
      let data = {};
      $(this.$formElement)
        .serializeArray()
        .forEach((item) => {
          data[item.name] = item.value;
        });
      func(data);
      this.$formElement[0].reset();
      this.$formElement[0].elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
