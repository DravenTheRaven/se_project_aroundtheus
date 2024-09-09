import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this.handleSubmit = handleSubmit;
    this.popupForm = this.popup.querySelector(".popup__form");
  }

  _getInputValues() {
    return Object.fromEntries(
      Array.from(this.popup.querySelectorAll(".form__input")).map((item) => [
        item.id,
        item.value,
      ])
    );
  }

  setEventListeners() {
    this.popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.data = this._getInputValues();
      this.handleSubmit(event, this.data);
    });
    super.setEventListeners();
  }
}
