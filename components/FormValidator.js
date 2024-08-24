export class FormValidator {
  constructor(options, formElement) {
    this.options = options;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(".form__input")
    );
  }

  _setEventListeners() {
    const buttonElement = this.formElement.querySelector(".popup__button");
    this._toggleButtonState(buttonElement);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  }

  _toggleButtonState(buttonElement) {
    if (this._checkValidInput()) {
      this.disableSubmitButton(buttonElement);
    } else {
      this.enableSubmitButton(buttonElement);
    }
  }

  disableSubmitButton(buttonElement) {
    buttonElement.setAttribute("disabled", "");
    buttonElement.classList.add("popup__button-disabled");
  }

  enableSubmitButton(buttonElement) {
    if (!this._checkValidInput()) {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove("popup__button-disabled");
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
