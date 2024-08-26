export class FormValidator {
  constructor(options, formElement) {
    this.options = options;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(".form__input")
    );
    this.buttonElement = this.formElement.querySelector(".popup__button");
  }

  _setEventListeners() {
    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
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
    this.buttonElement.setAttribute("disabled", "");
    this.buttonElement.classList.add("popup__button-disabled");
  }

  enableSubmitButton() {
    if (!this._checkValidInput()) {
      this.buttonElement.removeAttribute("disabled");
      this.buttonElement.classList.remove("popup__button-disabled");
      this.inputList.forEach((input) => {
        this._hideInputError(input);
      });
    }
  }

  _checkValidInput() {
    return this.inputList.some((inputElement) => {
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
    const errorElement = this.formElement.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(
      `.form__${inputElement.id}-error`
    );
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
  }

  enableValidation() {
    this._setEventListeners();
  }
}
