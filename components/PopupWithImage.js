import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(event) {
    const imagePopupImage = this.popup.querySelector(".image-popup__image");
    imagePopupImage.src = event.target.src;
    imagePopupImage.alt = event.target.alt;
    this.popup.querySelector(".image-popup__text").textContent =
      event.target.alt;
    super.open();
  }
}
