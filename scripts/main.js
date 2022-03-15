(function (window) {
  "use strict";

  const FORM_SELECTOR = '[data-chocolate-order="form"]';
  const SLIDER_SELECTOR = '[data-chocolate-order="slider"]';

  let App = window.App;
  let Truck = App.Truck;
  let DataStore = App.DataStore;
  let FormHandler = App.FormHandler;
  let Slider = App.Slider;

  let myTruck = new Truck("12345", new DataStore());
  window.myTruck = myTruck;

  let formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));

  let slider = new Slider(SLIDER_SELECTOR);
  slider.addChangeHandler();
})(window);
