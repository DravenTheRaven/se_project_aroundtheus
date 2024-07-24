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
const closeButton = document.querySelector(".edit-modal__close-button");
const addCloseButton = document.querySelector(".add-modal__close-button");
const imageCloseButton = document.querySelector(".modal-image__close-button");
const addButton = document.querySelector(".profile__button");
const imageModal = document.querySelector(".image-modal");
const formName = document.querySelector(".profile__title");
const formDescription = document.querySelector(".profile__subtitle");
const editForm = document.querySelector(".edit-form");
const addForm = document.querySelector(".add-form");
const newFormName = document.querySelector(".form__name");
const newFormDescription = document.querySelector(".form__description");

function toggleProfileModal(event) {
  const editModal = document.querySelector(".edit-modal");
  const addModal = document.querySelector(".add-modal");
  if (
    event.target.classList[0] === "profile__edit-button" ||
    event.target.classList[1] === "edit-modal__close-button" ||
    event.target.classList[1] === "edit-form"
  ) {
    editModal.classList.toggle("modal_opened");
  } else if (
    event.target.classList[0] === "profile__button" ||
    event.target.classList[1] === "add-modal__close-button" ||
    event.target.classList[1] === "add-form"
  ) {
    addModal.classList.toggle("modal_opened");
  } else if (
    event.target.classList[0] === "card__image" ||
    event.target.classList[1] === "modal-image__close-button"
  ) {
    imageModal.classList.toggle("modal_opened");
  }
}

function openModalDisplay(event) {
  newFormDescription.value = `${formDescription.textContent}`;
  newFormName.value = `${formName.textContent}`;
  toggleProfileModal(event);
}

function closeModalDisplay(event) {
  toggleProfileModal(event);
}

function changeProfileInfo(event) {
  formName.textContent = `${newFormName.value}`;
  formDescription.textContent = `${newFormDescription.value}`;
  toggleProfileModal(event);
  event.preventDefault();
}

function addLocationCard(event) {
  const newLocationTitle = document.querySelector("#title").value;
  const newLocationImage = document.querySelector(".form__image-url").value;
  const newLocation = { name: newLocationTitle, link: newLocationImage };
  cardContainer.append(createCard(newLocation));
  toggleProfileModal(event);
  event.preventDefault();
}

function likeButton(event) {
  event.target.classList.toggle("card__button-clicked");
}

function deleteButton(event) {
  event.target.parentElement.remove();
}

function openImageModel(event) {
  imageModal.querySelector(".modal__image").src = event.target.src;
  imageModal.querySelector(".modal__image").alt = event.target.alt;
  imageModal.querySelector(".modal-image__text").textContent = event.target.alt;
  console.log(imageModal.querySelector(".modal-image__text").textContent);
  toggleProfileModal(event);
}

editButton.addEventListener("click", openModalDisplay);
addButton.addEventListener("click", openModalDisplay);
closeButton.addEventListener("click", closeModalDisplay);
addCloseButton.addEventListener("click", closeModalDisplay);
imageCloseButton.addEventListener("click", closeModalDisplay);
editForm.addEventListener("submit", changeProfileInfo);
addForm.addEventListener("submit", addLocationCard);

function createCard(cardData) {
  const templateClone = template.content.cloneNode(true);
  templateClone.querySelector(".card__image").src = cardData.link;
  templateClone.querySelector(".card__image").alt = cardData.name;
  templateClone.querySelector(".card__text").textContent = cardData.name;
  templateClone
    .querySelector(".card__button")
    .addEventListener("click", likeButton);
  templateClone
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteButton);
  templateClone
    .querySelector(".card__image")
    .addEventListener("click", openImageModel);
  return templateClone;
}

function renderCard(data) {
  data.forEach((element) => cardContainer.append(createCard(element)));
}

renderCard(initialCards);
