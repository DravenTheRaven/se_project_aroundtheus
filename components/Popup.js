export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
    this.closeButton = this.popup.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    console.log("popup open");
    this.popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    console.log("popup close");
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    console.log("yup");
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
    document.addEventListener("keydown", this._handleEscClose);
    this.closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
