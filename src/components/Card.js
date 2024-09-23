export class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDelete,
    handleLike,
    openDeletePopup
  ) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this.isLiked = data.isLiked;
    this._template = cardSelector;
    this._handleImageClick = handleImageClick;
    this._templateClone = this._template.content.cloneNode(true);
    this._cardImage = this._templateClone.querySelector(".card__image");
    this._likeButton = this._templateClone.querySelector(".card__button");
    this.handleDelete = handleDelete;
    this.handleLike = handleLike;
    this.openDeletePopup = openDeletePopup;
    this._checkInitialLike();
  }

  _checkInitialLike() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__button-clicked");
    } else {
      this._likeButton.classList.remove("card__button-clicked");
    }
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
      .addEventListener("click", (event) => {
        this.handleLike(this.id, this.isLiked)
          .then((res) => res.json())
          .then((data) => console.log(data));
        this._likeCard(event);
        this.isLiked = !this.isLiked;
      });
    this._templateClone
      .querySelector(".card__delete-button")
      .addEventListener("click", (event) => {
        const cardData = event.target.closest(".card");
        this.openDeletePopup(this.id, cardData);
      });
    this._cardImage.addEventListener("click", this._handleImageClick);
  }
}
