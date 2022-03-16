(function (window) {
  let App = window.App || {};
  let $ = window.jQuery;

  function FormHandler(formSelector, resetSelector, slider) {
    if (!formSelector || !resetSelector)
      throw new Error("Oops! You forgot to provide a selector!");
    this.$formElement = $(formSelector);
    this.$resetElement = $(resetSelector);
    this.slider = slider;
    if (this.$formElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + formSelector
      );
    } else if (this.$resetElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + resetSelector
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

  FormHandler.prototype.addResetHandler = function () {
    this.$resetElement.on("click", (e) => {
      e.preventDefault();
      this.$formElement[0].reset();
      this.slider.updateSliderValue();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
