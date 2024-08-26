export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this.template = cardSelector;
    this.handleImageClick = handleImageClick;
  }

  getCard() {
    const templateClone = this.template.content.cloneNode(true);
    const cardImage = templateClone.querySelector(".card__image");
    cardImage.src = this.link;
    cardImage.alt = this.name;
    templateClone.querySelector(".card__text").textContent = this.name;
    this._setEventListeners(templateClone, cardImage);
    return templateClone;
  }

  _deleteCard(event) {
    event.target.closest(".card").remove();
  }

  _likeCard(event) {
    event.target.classList.toggle("card__button-clicked");
  }

  _setEventListeners(templateClone, cardImage) {
    templateClone
      .querySelector(".card__button")
      .addEventListener("click", this._likeCard);
    templateClone
      .querySelector(".card__delete-button")
      .addEventListener("click", this._deleteCard);
    cardImage.addEventListener("click", this.handleImageClick);
  }
}
