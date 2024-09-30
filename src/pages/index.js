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
const user = new UserInfo(profileFormName, profileFormDescription);

function openProfilePopup() {
  const userInfo = user.getUserInfo();
  newProfileFormName.value = userInfo["name-input"];
  newProfileFormDescription.value = userInfo["description-input"];
  user.setUserInfo(userInfo);
  editFormValidator.resetValidation();
  editPopup.open();
}

function changeProfileInfo(event, data) {
  user.setUserInfo(data);
  api.postUserInfo(data);
  api.fetchUserInfo();
  editPopup.close();
}

function addLocationCard(event, data) {
  const newLocation = { name: data["title"], link: data["image-url"] };
  api.postCard(newLocation).then((data) => {
    cardSection.renderer(data);
  });
  event.target.reset();
  addFormValidator.disableSubmitButton();
  addPopup.close();
}

function openImageModel(event) {
  imagePopup.open(event);
}

function openEditProfilePicture() {
  profilePicturePopup.open();
}

function openConfirmDelete(locationCardId, locationCard) {
  const deletePopup = new PopupDelete(
    ".confirm-delete-popup",
    locationCardId,
    locationCard,
    deleteLocationCard
  );
  deletePopup.setEventListeners();
  deletePopup.open();
}

function deleteLocationCard(locationCardId, locationCard) {
  api.deleteCard(locationCardId).then(locationCard.remove());
}

function changeProfilePicture(event, pictureLink) {
  profilePicture.src = pictureLink["image-url"];
  console.log(profilePicture.src);
  api.changeProfilePicture(pictureLink).then(api.fetchUserInfo());
  profilePicturePopup.close();
}

editButton.addEventListener("click", openProfilePopup);

addButton.addEventListener("click", () => {
  addPopup.open();
});

profilePictureWrapper.addEventListener("click", openEditProfilePicture);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileImageFormValidator.enableValidation();
imagePopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();
profilePicturePopup.setEventListeners();

const getInitialCards = async () => {
  const cards = await api.getCards();
  cards.forEach((card) => {
    cardSection.renderer(card);
  });
};
getInitialCards();

api
  .fetchUserInfo()

  .then((userData) => {
    console.log(userData);
    profilePicture.src = userData.avatar;
    user.setUserInfo({
      "name-input": userData.name,
      "description-input": userData.about,
    });
  });
