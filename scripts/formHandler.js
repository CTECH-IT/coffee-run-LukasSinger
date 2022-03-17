(function (window) {
  let App = window.App || {};
  let $ = window.jQuery;

  function FormHandler(formSelector, resetSelector, superSelector, slider) {
    if (!formSelector || !resetSelector || !superSelector)
      throw new Error("Oops! You forgot to provide a selector!");
    this.$formElement = $(formSelector);
    this.$resetElement = $(resetSelector);
    this.$superModal = $(superModal);
    this.slider = slider;
    if (this.$formElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + formSelector
      );
    } else if (this.$resetElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + resetSelector
      );
    } else if (this.$superModal.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + superSelector
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
      if (data["size"] == "yuge" && data["purity"] == 100) {
        this.$superModal.modal();
      }
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
