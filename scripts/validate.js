function showInputError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(
    `.form__${inputElement.id}-error`
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(
    `.form__${inputElement.id}-error`
  );
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function checkValidInput(inputList, options) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, options) {
  if (checkValidInput(inputList, options)) {
    buttonElement.setAttribute("disabled", "");
    buttonElement.classList.add("popup__button-disabled");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("popup__button-disabled");
  }
}

function setEventListeners(formElement, options) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
}

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement, options);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
