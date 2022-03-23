(function (window) {
  "use strict";

  let App = window.App || {};
  let $ = window.jQuery;

  function FormHandler(
    formSelector,
    emailSelector,
    resetSelector,
    superSelector,
    optInSelector,
    powerSectSelect,
    slider
  ) {
    if (
      !formSelector ||
      !emailSelector ||
      !resetSelector ||
      !superSelector ||
      !optInSelector ||
      !powerSectSelect
    )
      throw new Error("Oops! You forgot to provide a selector!");
    this.superEmails = [];
    this.$formElement = $(formSelector);
    this.$emailElement = $(emailSelector);
    this.$resetElement = $(resetSelector);
    this.$superModal = $(superSelector);
    this.$superOptIn = $(optInSelector);
    this.$powerSect = $(powerSectSelect);
    this.slider = slider;
    if (this.$formElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + formSelector
      );
    } else if (this.$emailElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + emailSelector
      );
    } else if (this.$resetElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + resetSelector
      );
    } else if (this.$superModal.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + superSelector
      );
    } else if (this.$superOptIn.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + optInSelector
      );
    } else if (this.$powerSect.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + powerSectSelect
      );
    }
  }

  FormHandler.prototype.addEmailHandler = function () {
    this.$emailElement.on("input", (e) => {
      if (this.superEmails.includes(this.$emailElement[0].value)) {
        this.$powerSect[0].classList.remove("hidden");
      } else {
        this.$powerSect[0].classList.add("hidden");
      }
    });
    this.$formElement.on("submit", (e) => {
      e.preventDefault();
      this.$powerSect[0].classList.add("hidden");
    });
  };

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
      this.slider.updateSliderValue();
      if (data["size"] == "yuge" && data["purity"] == 100) {
        this.$superModal.modal();
        this.$superOptIn.on("click", (e) => {
          this.superEmails.push(data["emailAddress"]);
          // this.$powerSect[0].classList.remove("hidden");
        });
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

  FormHandler.prototype.addEmailValidityHandler = function (func) {
    this.$formElement.on("input", "[name='emailAddress']", function (e) {
      let email = e.target.value;
      if (func(email)) {
        e.target.setCustomValidity("");
      } else {
        e.target.setCustomValidity(
          "Not a valid email address. Smh you can't even type"
        );
      }
    });
  };

  FormHandler.prototype.addOrderValidityHandler = function (func) {
    this.$formElement.on("input", "[name='chocolate']", (e) => {
      let order = e.target.value;
      let strength = this.slider.$sliderElement[0].value;
      if (func(order, strength)) {
        e.target.setCustomValidity("");
        this.slider.$sliderElement[0].setCustomValidity("");
      } else {
        e.target.setCustomValidity(
          "You can't have decaf if you want a ton of cocoa. Don't you know how caffeine works?"
        );
        this.slider.$sliderElement[0].setCustomValidity(
          "You can't have decaf if you want a ton of cocoa. Don't you know how caffeine works?"
        );
      }
    });
  };

  FormHandler.prototype.addStrengthValidityHandler = function (func) {
    this.$formElement.on("input", "[name='purity']", (e) => {
      let order = document.querySelector("[name='chocolate']").value;
      let strength = e.target.value;
      if (func(order, strength)) {
        e.target.setCustomValidity("");
        document.querySelector("[name='chocolate']").setCustomValidity("");
      } else {
        e.target.setCustomValidity(
          "You can't have decaf if you want a ton of cocoa. Don't you know how caffeine works?"
        );
        document
          .querySelector("[name='chocolate']")
          .setCustomValidity(
            "You can't have decaf if you want a ton of cocoa. Don't you know how caffeine works?"
          );
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
