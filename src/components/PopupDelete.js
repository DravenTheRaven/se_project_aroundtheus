import { Popup } from "./Popup.js";

export class PopupDelete extends Popup {
  constructor(selector, id, cardElement, handleDelete) {
    super(selector);

    this.cardId = id;
    this.cardElement = cardElement;
    this.handleDelete = handleDelete;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.handleDelete(this.cardId, this.cardElement);
    this.close();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleSubmit);
    super.setEventListeners();
  }
}
