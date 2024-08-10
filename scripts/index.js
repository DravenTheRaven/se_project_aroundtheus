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
const locationTitleInput = document.querySelector(".form__location-title");
const locationURLInput = document.querySelector(".form__image-url");

function openAndCloseModal(modal) {
  modal.classList.toggle("modal_opened");
  addEscapeListener();
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  addEscapeListener();
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  removeEscapeListener();
}

function openProfileModal(event) {
  newProfileFormDescription.value = `${profileFormDescription.textContent}`;
  newProfileFormName.value = `${profileFormName.textContent}`;
  openModal(editModal);
}

function openAddModal() {
  locationTitleInput.value = "";
  locationURLInput.value = "";
  openModal(addModal);
}

function changeProfileInfo(event) {
  profileFormName.textContent = `${newProfileFormName.value}`;
  profileFormDescription.textContent = `${newProfileFormDescription.value}`;
  closeModal(editModal);
  event.preventDefault();
}

function addLocationCard(event) {
  const newLocationTitle = locationTitleInput.value;
  const newLocationImage = locationURLInput.value;
  const newLocation = { name: newLocationTitle, link: newLocationImage };
  cardContainer.prepend(createCard(newLocation));
  closeModal(addModal);
  event.preventDefault();
}

function likeCard(event) {
  event.target.classList.toggle("card__button-clicked");
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function openImageModel(event) {
  const imageModalImage = imageModal.querySelector(".image-modal__image");
  imageModalImage.src = event.target.src;
  imageModalImage.alt = event.target.alt;
  imageModal.querySelector(".image-modal__text").textContent = event.target.alt;
  openModal(imageModal);
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

editButton.addEventListener("click", openProfileModal);
addButton.addEventListener("click", openAddModal);
editForm.addEventListener("submit", changeProfileInfo);
addForm.addEventListener("submit", addLocationCard);
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function addEscapeListener() {
  document.addEventListener("keydown", escapeClose);
}

function removeEscapeListener() {
  document.removeEventListener("keydown", escapeClose);
}

function escapeClose(event) {
  if (event.key === "Escape") {
    modalList.forEach((modalElement) => {
      if (modalElement.classList.contains("modal_opened")) {
        closeModal(modalElement);
      }
    });
  }
}

modalList.forEach((modalElement) => {
  modalElement.addEventListener("click", function (event) {
    console.log(event);
    if (event.target.classList.contains("modal")) {
      closeModal(modalElement);
    }
  });
});
