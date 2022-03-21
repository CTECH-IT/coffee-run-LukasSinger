(function (window) {
  "use strict";

  const FORM_SELECTOR = '[data-chocolate-order="form"]';
  const EMAIL_SELECTOR = 'input[name="emailAddress"]';
  const SLIDER_SELECTOR = '[data-chocolate-order="slider"]';
  const SLIDER_LABEL_SELECTOR = '[data-chocolate-order="sliderLabel"]';
  const POWERUP_MODAL_SELECTOR = "#superModal";
  const POWERUP_OPTIN_SELECTOR = '[data-chocolate-order="superoptin"]';
  const POWERUP_SECTION = '[data-chocolate-order="powerup"]';
  const RESET_BUTTON_SELECTOR = 'button[type="reset"]';
  const CHECKLIST_SELECTOR = '[data-chocolate-order="checklist"]';
  const TOO_BAD_SELECTOR = "#tooBad";

  let App = window.App;
  let Truck = App.Truck;
  let DataStore = App.DataStore;
  let FormHandler = App.FormHandler;
  let Slider = App.Slider;
  let Checklist = App.Checklist;

  let myTruck = new Truck("12345", new DataStore());
  let checklist = new Checklist(CHECKLIST_SELECTOR, TOO_BAD_SELECTOR);

  window.myTruck = myTruck;

  let slider = new Slider(
    SLIDER_SELECTOR,
    SLIDER_LABEL_SELECTOR,
    RESET_BUTTON_SELECTOR
  );
  slider.addChangeHandler();

  let formHandler = new FormHandler(
    FORM_SELECTOR,
    EMAIL_SELECTOR,
    RESET_BUTTON_SELECTOR,
    POWERUP_MODAL_SELECTOR,
    POWERUP_OPTIN_SELECTOR,
    POWERUP_SECTION,
    slider
  );
  formHandler.addEmailHandler();
  formHandler.addSubmitHandler(function (data) {
    myTruck.createOrder.call(myTruck, data);
    checklist.addRow.call(checklist, data);
  });
  formHandler.addResetHandler();

  checklist.addClickHandler(myTruck.deliverOrder.bind(myTruck));
})(window);
