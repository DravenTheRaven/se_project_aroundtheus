export class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._options.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _toggleButtonState() {
    if (this._checkValidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  disableSubmitButton() {
    this._buttonElement.setAttribute("disabled", "");
    this._buttonElement.classList.add(this._options.inactiveButtonClass);
  }

  enableSubmitButton() {
    if (!this._checkValidInput()) {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._options.inactiveButtonClass);
    }
  }

  _checkValidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.remove(this._options.inputErrorClass);
    errorElement.textContent = "";
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.add(this._options.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this.enableSubmitButton();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
