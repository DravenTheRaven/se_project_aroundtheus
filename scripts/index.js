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
const closeButton = document.querySelector(".modal__close-button");
const modal = document.querySelector(".modal");
const formName = document.querySelector(".profile__title");
const formDescription = document.querySelector(".profile__subtitle");
const form = document.querySelector(".form");
const newFormName = document.querySelector(".form__name");
const newFormDescription = document.querySelector(".form__description");

function toggleProfileModal() {
  modal.classList.toggle("modal_opened");
}

function openModalDisplay(event) {
  newFormDescription.value = `${formDescription.textContent}`;
  newFormName.value = `${formName.textContent}`;
  toggleProfileModal();
}

function closeModalDisplay(event) {
  toggleProfileModal();
}

function changeProfileInfo(event) {
  formName.textContent = `${newFormName.value}`;
  formDescription.textContent = `${newFormDescription.value}`;
  toggleProfileModal();
  event.preventDefault();
}

editButton.addEventListener("click", openModalDisplay);
closeButton.addEventListener("click", closeModalDisplay);
form.addEventListener("submit", changeProfileInfo);

function createCard(cardData) {
  const templateClone = template.content.cloneNode(true);
  templateClone.querySelector(".card__image").src = cardData.link;
  templateClone.querySelector(".card__image").alt = cardData.name;
  templateClone.querySelector(".card__text").textContent = cardData.name;
  return templateClone;
}

function renderCard(data) {
  for (let x of data) {
    cardContainer.append(createCard(x));
  }
}

renderCard(initialCards);
