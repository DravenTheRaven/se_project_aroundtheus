export default class Section {
  constructor({ element }, selector) {
    this.items = element.items;
    this.renderer = element.renderer;
    this.selector = selector;
  }

  renderItems() {
    this.items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(item) {
    this.renderer(item);
  }
}
