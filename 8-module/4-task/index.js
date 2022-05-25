import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  modal = null;
  modalBody = null;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (!product) return;
    let item = this.cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (item) {
      item.count += 1;
    } else {
      item = {
        product,
        count: 1,
      };
      this.cartItems.push(item);
    }
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let item = this.cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );
    item.count += amount;
    item.count === 0 && this.cartItems.splice(this.cartItems.indexOf(item), 1);
    this.onProductUpdate(item);
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce((acc, item) => {
      return acc + item.count;
    }, 0);
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    return this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.count,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  clickOnModal = (e) => {
    if (e.target.closest(".cart-counter__button")) {
      this.updateProductCount(
        e.target.closest("[data-product-id]").dataset.productId,
        e.target.closest(".cart-counter__button_minus") ? -1 : 1
      );
    }
  };

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    const modalBody = document.createElement("div");
    for (let { product, count } of this.cartItems) {
      modalBody.append(this.renderProduct(product, count));
    }
    modalBody.append(this.renderOrderForm());
    this.modal.setBody(modalBody);
    this.modal.modal
      .querySelector(".modal__body")
      .addEventListener("click", this.clickOnModal);
    this.modal.modal.querySelector(".cart-form").onsubmit = this.onSubmit;

    this.modal.open();
  }

  onProductUpdate({ product, count }) {
    // ...ваш код
    let { price, id } = product;
    if (document.body.classList.contains("is-modal-open")) {
      if (this.cartItems.length) {
        let productCount = this.modal.modal.querySelector(
          `[data-product-id="${id}"] .cart-counter__count`
        );

        // Элемент с общей стоимостью всех единиц этого товара
        let productPrice = this.modal.modal.querySelector(
          `[data-product-id="${id}"] .cart-product__price`
        );

        // Элемент с суммарной стоимостью всех товаров
        let infoPrice = this.modal.modal.querySelector(
          `.cart-buttons__info-price`
        );
        productCount.innerHTML = count;
        productPrice.innerHTML = `€${(price * count).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      } else {
        this.modal.close();
      }
    }
    this.cartIcon.update(this);
  }

  onSubmit = async (event) => {
    // ...ваш код
    event.preventDefault();
    event.target.querySelector('[type="submit"]').classList.add("is-loading");
    const formData = new FormData(event.target);
    let res = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      this.modal.setTitle("Success!");
      let sucecessBody = createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>
    `);
      this.modal.setBody(sucecessBody);
      this.cartItems = [];
      this.cartIcon.update(this);
    }
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
