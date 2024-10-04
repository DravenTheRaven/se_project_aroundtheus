import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this.submitButton = this._popup.querySelector(".popup__button");
    this.submitButtonText = this.submitButton.textContent;
    this.resetSubmitText = this.resetSubmitText.bind(this);
  }

  _getInputValues() {
    return Object.fromEntries(
      Array.from(this._popup.querySelectorAll(".form__input")).map((item) => [
        item.id,
        item.value,
      ])
    );
  }

  resetSubmitText() {
    this.submitButton.textContent = this.submitButtonText;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const submitText = this.submitButton.textContent;
      //this.submitButton.textContent = "Saving...";
      this._data = this._getInputValues();
      this._handleSubmit(event, this._data);
      //this.submitButton.textContent = submitText;
    });
    super.setEventListeners();
  }
}
