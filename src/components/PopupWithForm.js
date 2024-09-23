import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitButton = this._popup.querySelector(".popup__button");
  }

  _getInputValues() {
    return Object.fromEntries(
      Array.from(this._popup.querySelectorAll(".form__input")).map((item) => [
        item.id,
        item.value,
      ])
    );
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const submitText = this._submitButton.textContent;
      this._submitButton.textContent = "Saving...";
      this._data = this._getInputValues();
      this._handleSubmit(event, this._data);
      this._submitButton.textContent = submitText;
    });
    super.setEventListeners();
  }
}
