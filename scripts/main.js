(function (window) {
  "use strict";

  const FORM_SELECTOR = '[data-chocolate-order="form"]';
  const SLIDER_SELECTOR = '[data-chocolate-order="slider"]';
  const SLIDER_LABEL_SELECTOR = '[data-chocolate-order="sliderLabel"]';
  const POWERUP_MODAL_SELECTOR = "#superModal";
  const RESET_BUTTON_SELECTOR = 'button[type="reset"]';

  let App = window.App;
  let Truck = App.Truck;
  let DataStore = App.DataStore;
  let FormHandler = App.FormHandler;
  let Slider = App.Slider;

  let myTruck = new Truck("12345", new DataStore());
  window.myTruck = myTruck;

  let slider = new Slider(
    SLIDER_SELECTOR,
    SLIDER_LABEL_SELECTOR,
    RESET_BUTTON_SELECTOR
  );
  slider.addChangeHandler();

  let formHandler = new FormHandler(
    FORM_SELECTOR,
    RESET_BUTTON_SELECTOR,
    POWERUP_MODAL_SELECTOR,
    slider
  );
  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  formHandler.addResetHandler();
})(window);
