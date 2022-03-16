(function (window) {
  let App = window.App || {};
  let $ = window.jQuery;

  function Slider(sliderSelector, labelSelector, resetSelector) {
    if (!sliderSelector || !labelSelector || !resetSelector)
      throw new Error("Oops! You forgot to provide a selector!");
    this.$sliderElement = $(sliderSelector);
    this.$labelElement = $(labelSelector);
    this.$resetElement = $(resetSelector);
    if (this.$sliderElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + sliderSelector
      );
    } else if (this.$labelElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + labelSelector
      );
    } else if (this.$resetElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + resetSelector
      );
    }
    updateSliderValue.bind(this)();
  }

  Slider.prototype.addChangeHandler = function () {
    this.$sliderElement.on("input", (e) => {
      updateSliderValue.bind(this)();
    });
  };

  Slider.prototype.updateSliderValue = function () {
    updateSliderValue.bind(this)();
  };

  function updateSliderValue() {
    let label = this.$labelElement[0];
    let slider = this.$sliderElement[0];
    let strength = this.$sliderElement[0].value;
    let getColor = () =>
      strength < 15
        ? "blue"
        : strength < 35
        ? "green"
        : strength < 60
        ? "yellow"
        : "red";
    label.innerText = label.getAttribute("basetext") + ` (${strength}%)`;
    label.setAttribute("class", getColor());
    slider.setAttribute("class", "form-control-range " + getColor() + "-bg");
  }

  App.Slider = Slider;
  window.App = App;
})(window);
