import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
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
} from "../utils/utils.js";
import "./index.css";

const editPopup = new PopupWithForm(".edit-popup", changeProfileInfo);
const addPopup = new PopupWithForm(".add-popup", addLocationCard);
const editFormValidator = new FormValidator(options, editForm);
const addFormValidator = new FormValidator(options, addForm);
const imagePopup = new PopupWithImage(".image-popup");
const cardSection = new Section({
  renderer: (item) => {
    const cardElement = new Card(item, template, openImageModel);
    cardSection.addItem(cardElement.getCard());
  },
  selector: ".cards",
});
const user = new UserInfo(
  profileFormName,
  profileFormDescription,
  newProfileFormName,
  newProfileFormDescription
);

function openProfilePopup(event) {
  user.getUserInfo();
  editFormValidator.resetValidation();
  editPopup.open();
}

function changeProfileInfo(event, data) {
  user.setUserInfo(data);
  event.preventDefault();
  editPopup.close();
}

function addLocationCard(event, data) {
  const newLocation = { name: data["title"], link: data["image-url"] };
  cardSection.renderer(newLocation);
  event.target.reset();
  addFormValidator.disableSubmitButton();
  event.preventDefault();
  addPopup.close();
}

function openImageModel(event) {
  imagePopup.open(event);
}

cardSection.renderItems(initialCards);

editButton.addEventListener("click", openProfilePopup);

addButton.addEventListener("click", () => {
  addPopup.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
imagePopup.setEventListeners();
