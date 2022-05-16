export default class ProductCard {
  #name = null;
  #price = 0;
  #category = null;
  #image = null;
  #id = null;
  #elem = null;
  constructor({ name, price, category, image, id }) {
    this.#name = name;
    this.#price = price;
    this.#category = category;
    this.#image = image;
    this.#id = id;
    this.#elem = document.createElement("div");
    this.render();
  }

  clickEvent = () => {
    const event = new CustomEvent('product-add', { 
      bubbles: true, 
      detail: this.#id,
    });

    this.elem.dispatchEvent(event);
  }

  get elem() {
    return this.#elem;
  }

  render() {
    const card = `
    <div class="card__top">
        <img src="/assets/images/products/${this.#image}" class="card__image" alt="product">
        <span class="card__price">€${this.#price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${this.#name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
    `;
    this.elem.classList.add('card');
    this.elem.innerHTML = card;
    this.elem.addEventListener('click', this.clickEvent);
  }


}
