(function (window) {
  let App = window.App || {};
  let $ = window.jQuery;

  function Slider(selector) {
    if (!selector) throw new Error("Oops! You forgot to provide a selector!");
    this.$sliderElement = $(selector);
    if (this.$sliderElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + selector
      );
    }
    updateSliderValue();
  }

  Slider.prototype.addChangeHandler = function () {
    updateSliderValue();
  };

  function updateSliderValue() {
    this.$sliderElement.innerText =
      this.$sliderElement.getAttribute("basetext") +
      ` (${this.$sliderElement.value})`;
  }

  App.Slider = Slider;
  window.App = App;
})();
