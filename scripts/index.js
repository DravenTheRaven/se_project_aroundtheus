const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const template = document.querySelector("#card__template");
const cardContainer = document.querySelector(".cards");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__button");
const imageModal = document.querySelector(".image-modal");
const profileFormName = document.querySelector(".profile__title");
const profileFormDescription = document.querySelector(".profile__subtitle");
const editForm = document.querySelector(".edit-form");
const addForm = document.querySelector(".add-form");
const newProfileFormName = document.querySelector(".form__name");
const newProfileFormDescription = document.querySelector(".form__description");
const editModal = document.querySelector(".edit-modal");
const addModal = document.querySelector(".add-modal");
const closeButtons = document.querySelectorAll(".modal__close-button");
const modalList = Array.from(document.querySelectorAll(".modal"));

function openAndCloseModal(modal) {
  modal.classList.toggle("modal_opened");
}

function openProfileModal(event) {
  newProfileFormDescription.value = `${profileFormDescription.textContent}`;
  newProfileFormName.value = `${profileFormName.textContent}`;
  openAndCloseModal(editModal);
}

function openAddModal() {
  document.querySelector("#title").value = "";
  document.querySelector(".form__image-url").value = "";
  openAndCloseModal(addModal);
}

function changeProfileInfo(event) {
  profileFormName.textContent = `${newProfileFormName.value}`;
  profileFormDescription.textContent = `${newProfileFormDescription.value}`;
  openAndCloseModal(editModal);
  event.preventDefault();
}

function addLocationCard(event) {
  const newLocationTitle = document.querySelector("#title").value;
  const newLocationImage = document.querySelector(".form__image-url").value;
  const newLocation = { name: newLocationTitle, link: newLocationImage };
  cardContainer.prepend(createCard(newLocation));
  openAndCloseModal(addModal);
  event.preventDefault();
}

function likeCard(event) {
  event.target.classList.toggle("card__button-clicked");
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function openImageModel(event) {
  imageModal.querySelector(".image-modal__image").src = event.target.src;
  imageModal.querySelector(".image-modal__image").alt = event.target.alt;
  imageModal.querySelector(".image-modal__text").textContent = event.target.alt;
  openAndCloseModal(imageModal);
}

function createCard(cardData) {
  const templateClone = template.content.cloneNode(true);
  const cardImage = templateClone.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  templateClone.querySelector(".card__text").textContent = cardData.name;
  templateClone
    .querySelector(".card__button")
    .addEventListener("click", likeCard);
  templateClone
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  templateClone
    .querySelector(".card__image")
    .addEventListener("click", openImageModel);
  return templateClone;
}

function renderCards(data) {
  data.forEach((element) => cardContainer.append(createCard(element)));
}

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

renderCards(initialCards);
enableValidation();
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modalList.forEach((modalElement) => {
      if (modalElement.classList.contains("modal_opened")) {
        modalElement.classList.remove("modal_opened");
      }
    });
  }
});

modalList.forEach((modalElement) => {
  modalElement.addEventListener("click", function (event) {
    console.log(event);
    if (event.target.classList.contains("modal")) {
      modalElement.classList.remove("modal_opened");
    }
  });
});
