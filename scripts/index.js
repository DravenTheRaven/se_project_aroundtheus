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

let template = document.querySelector("#card__template");
let cardContainer = document.querySelector(".cards");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".modal__close-button");
let modal = document.querySelector(".modal");
let formName = document.querySelector(".profile__title");
let formDescription = document.querySelector(".profile__subtitle");
let formButton = document.querySelector(".form__button");
let newFormName = document.querySelector(".form__name");
let newFormDescription = document.querySelector(".form__description");

function openModalDisplay(event) {
  newFormDescription.value = `${formDescription.textContent}`;
  newFormName.value = `${formName.textContent}`;
  modal.classList.toggle("modal_opened");
}

function closeModalDisplay(event) {
  modal.classList.toggle("modal_opened");
}

function changeProfileInfo(event) {
  formName.textContent = `${newFormName.value}`;
  formDescription.textContent = `${newFormDescription.value}`;
  modal.classList.toggle("modal_opened");
  event.preventDefault();
}

editButton.addEventListener("click", openModalDisplay);
closeButton.addEventListener("click", closeModalDisplay);
formButton.addEventListener("click", changeProfileInfo);

function getCardElement(data) {
  for (let x of data) {
    let templateClone = template.content.cloneNode(true);
    templateClone.querySelector(".card__image").src = x.link;
    templateClone.querySelector(".card__image").alt = x.name;
    templateClone.querySelector(".card__text").textContent = x.name;
    cardContainer.append(templateClone);
  }
}

getCardElement(initialCards);
