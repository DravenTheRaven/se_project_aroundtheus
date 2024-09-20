import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import {
  initialCards,
  options,
  template,
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c6945e47-b548-4e1c-b20e-926f9841fa5f",
    "Content-Type": "application/json",
  },
});

const editPopup = new PopupWithForm(".edit-popup", changeProfileInfo);
const addPopup = new PopupWithForm(".add-popup", addLocationCard);
const editFormValidator = new FormValidator(options, editForm);
const addFormValidator = new FormValidator(options, addForm);
const imagePopup = new PopupWithImage(".image-popup");
const cardSection = new Section({
  renderer: (item) => {
    const cardElement = new Card(
      item,
      template,
      openImageModel,
      api.deleteCard,
      api.handleLike
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
  api
    .postCard(newLocation)
    .then((res) => res.json())
    .then((data) => {
      cardSection.renderer(data);
    });
  event.target.reset();
  addFormValidator.disableSubmitButton();
  addPopup.close();
}

function openImageModel(event) {
  console.log(event.target);
  imagePopup.open(event);
}

editButton.addEventListener("click", openProfilePopup);

addButton.addEventListener("click", () => {
  addPopup.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();
imagePopup.setEventListeners();
addPopup.setEventListeners();
editPopup.setEventListeners();
console.log("yes");

const testCards = async () => {
  const cards = await api
    .getCards()
    .then((res) => res.json())
    .then((data) => data);

  cards.forEach((card) => {
    cardSection.renderer(card);
  });
};
console.log(testCards());
//api.getCards().then((res) => console.log(res));
/*api
  .fetchUserInfo()
  .then((res) => res.json())
  .then((userData) => {
    console.log(userData);
    user.setUserInfo({
      "name-input": userData.name,
      "description-input": userData.about,
    });
  });*/

api
  .fetchUserInfo()
  .then((res) => res.json())
  .then((userData) => {
    console.log(userData);
    user.setUserInfo({
      "name-input": userData.name,
      "description-input": userData.about,
    });
  });

function handleLike(isLiked, locationCardId) {
  !isLiked ? api.likeCard(locationCardId) : api.dislikeCard(locationCardId);
  isLiked = !isLiked;
}
