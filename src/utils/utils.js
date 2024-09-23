export const initialCards = [
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

export const options = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const template = document.querySelector("#card__template");
export const cardContainer = document.querySelector(".cards");
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__button");
export const profileFormName = document.querySelector(".profile__title");
export const profileFormDescription =
  document.querySelector(".profile__subtitle");
export const editForm = document.forms["edit_profile_form"];
export const addForm = document.forms["new_place_form"];
export const confirmDeleteForm = document.forms["confirm_delete_form"];
export const newProfileFormName = document.querySelector(".form__name");
export const newProfileFormDescription =
  document.querySelector(".form__description");
export const profilePicture = document.querySelector(".profile__avatar");
export const profilePictureWrapper = document.querySelector(
  ".profile__avatar_wrapper"
);
