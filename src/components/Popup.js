export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.closeButton = this.popup.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this.popup.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup")) {
        this.close();
      }
    });
    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
