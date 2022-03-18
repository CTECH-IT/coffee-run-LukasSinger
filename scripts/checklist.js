(function (window) {
  "use strict";

  let App = window.App || {};
  let $ = window.jQuery;

  function Checklist(selector) {
    if (!selector) {
      throw new Error("Oops! You forgot to provide a selector!");
    }
    this.$checklistElement = $(selector);
    if (this.$checklistElement.length == 0) {
      throw new Error(
        "Typo? Could not find element with selector: " + selector
      );
    }
  }

  Checklist.prototype.addRow = function (chocOrder) {
    let row = new Row(chocOrder);
    this.$checklistElement.append(row.$rowElement);
  };

  function Row(chocOrder) {
    let $div = $("<div></div>", {
      "data-chocolate-order": "checkbox",
      class: "checkbox"
    });
    let $label = $("<label></label>");
    let $checkbox = $("<input></input>", {
      type: "checkbox",
      value: chocOrder.emailAddress
    });
    let description = `${chocOrder.size} ${
      chocOrder.filling ? `${chocOrder.filling} ` : ""
    } ${chocOrder.chocolate}, (${chocOrder.emailAddress}) [${
      chocOrder.purity
    }% purity]`;

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$rowElement = $div;
  }

  App.Checklist = Checklist;
  window.App = App;
})(window);
