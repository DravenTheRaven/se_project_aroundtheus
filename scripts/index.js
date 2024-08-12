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
const imagepopup = document.querySelector(".image-popup");
const profileFormName = document.querySelector(".profile__title");
const profileFormDescription = document.querySelector(".profile__subtitle");
const editForm = document.querySelector(".edit-form");
const addForm = document.querySelector(".add-form");
const newProfileFormName = document.querySelector(".form__name");
const newProfileFormDescription = document.querySelector(".form__description");
const editpopup = document.querySelector(".edit-popup");
const addpopup = document.querySelector(".add-popup");
const closeButtons = document.querySelectorAll(".popup__close-button");
const popupList = Array.from(document.querySelectorAll(".popup"));
const locationTitleInput = document.querySelector(".form__location-title");
const locationURLInput = document.querySelector(".form__image-url");

function openAndClosepopup(popup) {
  popup.classList.toggle("popup_opened");
  addEscapeListener();
}

function openpopup(popup) {
  popup.classList.add("popup_opened");
  addEscapeListener();
}

function closepopup(popup) {
  popup.classList.remove("popup_opened");
  removeEscapeListener();
}

function openProfilepopup(event) {
  newProfileFormDescription.value = `${profileFormDescription.textContent}`;
  newProfileFormName.value = `${profileFormName.textContent}`;
  openpopup(editpopup);
}

function openAddpopup() {
  locationTitleInput.value = "";
  locationURLInput.value = "";
  openpopup(addpopup);
}

function changeProfileInfo(event) {
  profileFormName.textContent = `${newProfileFormName.value}`;
  profileFormDescription.textContent = `${newProfileFormDescription.value}`;
  closepopup(editpopup);
  event.preventDefault();
}

function addLocationCard(event) {
  const newLocationTitle = locationTitleInput.value;
  const newLocationImage = locationURLInput.value;
  const newLocation = { name: newLocationTitle, link: newLocationImage };
  cardContainer.prepend(createCard(newLocation));
  closepopup(addpopup);
  event.preventDefault();
}

function likeCard(event) {
  event.target.classList.toggle("card__button-clicked");
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function openImageModel(event) {
  const imagepopupImage = imagepopup.querySelector(".image-popup__image");
  imagepopupImage.src = event.target.src;
  imagepopupImage.alt = event.target.alt;
  imagepopup.querySelector(".image-popup__text").textContent = event.target.alt;
  openpopup(imagepopup);
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
  cardImage.addEventListener("click", openImageModel);
  return templateClone;
}

function renderCards(data) {
  data.forEach((element) => cardContainer.append(createCard(element)));
}

renderCards(initialCards);

editButton.addEventListener("click", openProfilepopup);
addButton.addEventListener("click", openAddpopup);
editForm.addEventListener("submit", changeProfileInfo);
addForm.addEventListener("submit", addLocationCard);
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closepopup(popup));
});

function addEscapeListener() {
  document.addEventListener("keydown", escapeClose);
}

function removeEscapeListener() {
  document.removeEventListener("keydown", escapeClose);
}

function escapeClose(event) {
  if (event.key === "Escape") {
    popupList.forEach((popupElement) => {
      if (popupElement.classList.contains("popup_opened")) {
        closepopup(popupElement);
      }
    });
  }
}

popupList.forEach((popupElement) => {
  popupElement.addEventListener("click", function (event) {
    console.log(event);
    if (event.target.classList.contains("popup")) {
      closepopup(popupElement);
    }
  });
});
