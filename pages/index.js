import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import {
  initialCards,
  options,
  template,
  cardContainer,
  editButton,
  addButton,
  profileFormName,
  profileFormDescription,
  editForm,
  addForm,
  newProfileFormName,
  newProfileFormDescription,
} from "./constants.js";

const editPopup = new PopupWithForm(".edit-popup", changeProfileInfo);
const addPopup = new PopupWithForm(".add-popup", addLocationCard);
const editFormValidator = new FormValidator(options, editForm);
const addFormValidator = new FormValidator(options, addForm);
const imagePopupTest = new PopupWithImage(".image-popup");
const testSection = new Section({
  renderer: (item) => {
    const cardElement = new Card(item, template, openImageModel);
    testSection.addItem(cardElement.getCard());
  },
  selector: ".cards",
});

function openProfilePopup(event) {
  newProfileFormDescription.value = `${profileFormDescription.textContent}`;
  newProfileFormName.value = `${profileFormName.textContent}`;
  editFormValidator.resetValidation();
  editPopup.open();
}

function changeProfileInfo(event, data) {
  profileFormName.textContent = data["name-input"];
  profileFormDescription.textContent = data["description-input"];
  event.preventDefault();
  editPopup.close();
}

function addLocationCard(event, data) {
  const newLocation = { name: data["title"], link: data["image-url"] };

  testSection.renderer(newLocation);
  event.target.reset();
  addFormValidator.disableSubmitButton();
  event.preventDefault();
  addPopup.close();
}

function openImageModel(event) {
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

testSection.renderItems(initialCards);

editButton.addEventListener("click", openProfilePopup);

addButton.addEventListener("click", () => {
  addPopup.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
imagePopupTest.setEventListeners();
