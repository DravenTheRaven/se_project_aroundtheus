import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

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
const imagePopup = document.querySelector(".image-popup");
const profileFormName = document.querySelector(".profile__title");
const profileFormDescription = document.querySelector(".profile__subtitle");
const editForm = document.forms["edit_profile_form"];
const addForm = document.forms["new_place_form"];
const newProfileFormName = document.querySelector(".form__name");
const newProfileFormDescription = document.querySelector(".form__description");
const editPopup = new PopupWithForm(".edit-popup", changeProfileInfo);
const addPopup = new PopupWithForm(".add-popup", addLocationCard);
const closeButtons = document.querySelectorAll(".popup__close-button");
const popupList = Array.from(document.querySelectorAll(".popup"));
const locationTitleInput = document.querySelector(".form__location-title");
const locationURLInput = document.querySelector(".form__image-url");
const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const imagePopupTest = new PopupWithImage(".image-popup");

function openProfilePopup(event) {
  newProfileFormDescription.value = `${profileFormDescription.textContent}`;
  newProfileFormName.value = `${profileFormName.textContent}`;
  editFormValidator.resetValidation();
  editPopup.open();
}

function openAddPopup() {
  openPopup(addPopup);
}

function changeProfileInfo(event, data) {
  profileFormName.textContent = data["name-input"];
  profileFormDescription.textContent = data["description-input"];
  event.preventDefault();

  editPopup.close();
}

function addLocationCard(event, data) {
  const newLocation = { name: data["title"], link: data["image-url"] };
  cardContainer.prepend(createCard(newLocation));
  event.target.reset();
  addFormValidator.disableSubmitButton();
  event.preventDefault();
  addPopup.close();
}

function openImageModel(event) {
  /*const imagePopupImage = imagePopup.querySelector(".image-popup__image");
  imagePopupImage.src = event.target.src;
  imagePopupImage.alt = event.target.alt;
  imagePopup.querySelector(".image-popup__text").textContent = event.target.alt;
  openPopup(imagePopup);*/
  imagePopupTest.open(event);
}

function createCard(cardData) {
  const newCard = new Card(cardData, template, openImageModel);
  return newCard.getCard();
}

function renderCards(data) {
  data.forEach((element) => {
    cardContainer.append(createCard(element));
  });
}

renderCards(initialCards);

editButton.addEventListener("click", openProfilePopup);

addButton.addEventListener("click", () => {
  addPopup.open();
});
//editForm.addEventListener("submit", changeProfileInfo);
//addForm.addEventListener("submit", addLocationCard);

const editFormValidator = new FormValidator(options, editForm);
const addFormValidator = new FormValidator(options, addForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
imagePopupTest.setEventListeners();

console.log();
