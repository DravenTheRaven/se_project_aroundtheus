export class Section {
  constructor({ renderer, selector }) {
    this.renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(card) {
    this._element.prepend(card);
  }
}
