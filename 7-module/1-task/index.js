import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  #categories = [];
  #elem = null;

  constructor(categories) {
    this.#categories = categories;
    this.#render();
    this.#updateScroll();
    this.#createEvents();
  }

  get elem() {
    return this.#elem;
  }

  #render() {
    const TEMPLATE = createElement(`
    <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="./assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
    ${this.#categories
      .map(
        ({ id, name }) =>
          `<a href="#" class="ribbon__item" data-id=${id}>${name}</a>`
      )
      .join("")}
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="./assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `);
    this.#elem = TEMPLATE;
  }

  #updateScroll() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");

    const buttonLeft = this.elem.querySelector(".ribbon__arrow_left");
    const buttonRight = this.elem.querySelector(".ribbon__arrow_right");

    buttonLeft.classList.remove('ribbon__arrow_visible');

    this.elem.addEventListener("click", ({ target }) => {
      if (target.closest(".ribbon__arrow_right")) {
        ribbonInner.scrollBy(350, 0);
      }
      if (target.closest(".ribbon__arrow_left")) {
        ribbonInner.scrollBy(-350, 0);
      }
    });

    ribbonInner.addEventListener("scroll", (e) => {
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;

      let scrollLeft = ribbonInner.scrollLeft;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        buttonLeft.classList.remove("ribbon__arrow_visible");
      } else {
        buttonLeft.classList.add("ribbon__arrow_visible");
      }
      if (scrollRight < 1) {
        buttonRight.classList.remove("ribbon__arrow_visible");
      } else {
        buttonRight.classList.add("ribbon__arrow_visible");
      }
    });
  }

  clickEvent = (id) => {
    const event = new CustomEvent("ribbon-select", {
      detail: id,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  };

  #createEvents() {
    const items = this.elem.querySelectorAll(".ribbon__item");
    this.elem.addEventListener("click", ({ target }) => {
      if (target.classList.contains("ribbon__item")) {
        items.forEach((item) => {
          item.classList.remove("ribbon__item_active");
        });
        target.classList.add("ribbon__item_active");
        this.clickEvent(target.dataset.id);
      }
    });
  }
}
