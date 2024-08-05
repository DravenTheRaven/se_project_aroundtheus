function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_error");
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_error");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasValidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  console.log(hasValidInput(inputList));
  if (hasValidInput(inputList)) {
    buttonElement.setAttribute("disabled", "");
    buttonElement.classList.add("form__button-disabled");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("form__button-disabled");
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__button");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
  editButton.addEventListener("click", openProfileModal);
  addButton.addEventListener("click", openAddModal);
  editForm.addEventListener("submit", changeProfileInfo);
  addForm.addEventListener("submit", addLocationCard);
  closeButtons.forEach((button) => {
    const modal = button.closest(".modal");
    button.addEventListener("click", () => openAndCloseModal(modal));
  });
}
