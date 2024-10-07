import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupDelete } from "../components/PopupDelete.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {
  profilePictureWrapper,
  options,
  template,
  editButton,
  addButton,
  profileFormName,
  profileFormDescription,
  editForm,
  addForm,
  confirmDeleteForm,
  newProfileFormName,
  newProfileFormDescription,
  profilePicture,
  profilePictureForm,
} from "../utils/utils.js";
import "./index.css";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c6945e47-b548-4e1c-b20e-926f9841fa5f",
    "Content-Type": "application/json",
  },
});

const editPopup = new PopupWithForm(".edit-popup", changeProfileInfo);
const addPopup = new PopupWithForm(".add-popup", addLocationCard);
const profilePicturePopup = new PopupWithForm(
  ".profile-picture-popup",
  changeProfilePicture
);
const deletePopup = new PopupDelete(
  ".confirm-delete-popup",
  "",
  "",
  deleteLocationCard
);

const editFormValidator = new FormValidator(options, editForm);
const addFormValidator = new FormValidator(options, addForm);
const profileImageFormValidator = new FormValidator(
  options,
  profilePictureForm
);

const imagePopup = new PopupWithImage(".image-popup");
const cardSection = new Section({
  renderer: (item) => {
    const cardElement = new Card(
      item,
      template,
      openImageModel,
      api.deleteCard,
      api.handleLike,
      openConfirmDelete
    );
    cardSection.addItem(cardElement.getCard());
  },
  selector: ".cards",
});
const user = new UserInfo(
  profileFormName,
  profileFormDescription,
  profilePicture
);

function openProfilePopup() {
  const userInfo = user.getUserInfo();
  console.log(userInfo);
  newProfileFormName.value = userInfo["name-input"];
  newProfileFormDescription.value = userInfo["description-input"];
  editFormValidator.resetValidation();
  editPopup.open();
}

function changeProfileInfo(event, data) {
  user.setUserInfo(data);
  console.log(data);
  toggleButtonText(editPopup.submitButton);
  api
    .postUserInfo(data)
    .then(() => {
      editPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(editPopup.resetSubmitText);
}

function addLocationCard(event, data) {
  toggleButtonText(addPopup.submitButton);
  const newLocation = { name: data["title"], link: data["image-url"] };
  api
    .postCard(newLocation)
    .then((data) => {
      cardSection.renderer(data);
      event.target.reset();
      addFormValidator.disableSubmitButton();
      addPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addPopup.resetSubmitText();
    });
}

function openImageModel(event) {
  imagePopup.open(event);
}

function openEditProfilePicture() {
  profilePicturePopup.open();
}

function openConfirmDelete(locationCardId, locationCard) {
  deletePopup.cardId = locationCardId;
  deletePopup.cardElement = locationCard;
  deletePopup.open();
}

function deleteLocationCard(locationCardId, locationCard) {
  api
    .deleteCard(locationCardId)
    .then(() => {
      locationCard.remove();
      deletePopup.cardId = "";
      deletePopup.cardElement = "";
      deletePopup.close();
    })
    .catch((err) => console.log(err));
}

function changeProfilePicture(event, pictureLink) {
  toggleButtonText(profilePicturePopup.submitButton);
  api
    .changeProfilePicture(pictureLink)
    .then(() => {
      profilePicturePopup.close();
      user.setProfilePicture(pictureLink);
    })
    .catch((err) => console.log(err))
    .finally(profilePicturePopup.resetSubmitText);
}

editButton.addEventListener("click", openProfilePopup);

addButton.addEventListener("click", () => {
  addPopup.open();
});

function toggleButtonText(buttonElement, buttonsStatusText = "Saving...") {
  const originalText = buttonElement.textContent;
  buttonElement.textContent = buttonsStatusText;
}

profilePictureWrapper.addEventListener("click", openEditProfilePicture);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileImageFormValidator.enableValidation();
imagePopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();
profilePicturePopup.setEventListeners();
deletePopup.setEventListeners();

const getInitialCards = async () => {
  try {
    const cards = await api.getCards();
    cardSection.renderItems(cards);
  } catch (error) {
    console.log(error);
  }
};
getInitialCards();

api
  .fetchUserInfo()
  .then((userData) => {
    user.setUserInfo({
      "name-input": userData.name,
      "description-input": userData.about,
      "profile-picture": userData.avatar,
    });
  })
  .catch((err) => console.log(err));
