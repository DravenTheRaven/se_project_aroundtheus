export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = cardSelector;
    this._handleImageClick = handleImageClick;
    this._templateClone = this._template.content.cloneNode(true);
    this._cardImage = this._templateClone.querySelector(".card__image");
  }

  getCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._templateClone.querySelector(".card__text").textContent = this._name;
    this._setEventListeners();
    return this._templateClone;
  }

  _deleteCard(event) {
    event.target.closest(".card").remove();
  }

  _likeCard(event) {
    event.target.classList.toggle("card__button-clicked");
  }

  _setEventListeners() {
    this._templateClone
      .querySelector(".card__button")
      .addEventListener("click", this._likeCard);
    this._templateClone
      .querySelector(".card__delete-button")
      .addEventListener("click", this._deleteCard);
    this._cardImage.addEventListener("click", this._handleImageClick);
  }
}
