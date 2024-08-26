export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this.template = cardSelector;
    this.handleImageClick = handleImageClick;
    this.templateClone = this.template.content.cloneNode(true);
    this.cardImage = this.templateClone.querySelector(".card__image");
  }

  getCard() {
    this.cardImage.src = this.link;
    this.cardImage.alt = this.name;
    this.templateClone.querySelector(".card__text").textContent = this.name;
    this._setEventListeners();
    return this.templateClone;
  }

  _deleteCard(event) {
    event.target.closest(".card").remove();
  }

  _likeCard(event) {
    event.target.classList.toggle("card__button-clicked");
  }

  _setEventListeners() {
    this.templateClone
      .querySelector(".card__button")
      .addEventListener("click", this._likeCard);
    this.templateClone
      .querySelector(".card__delete-button")
      .addEventListener("click", this._deleteCard);
    this.cardImage.addEventListener("click", this.handleImageClick);
  }
}
