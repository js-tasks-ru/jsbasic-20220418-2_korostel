import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  #slides = [];
  #elem = null;

  constructor(slides) {
    this.#slides = slides;
    this.render();
  }

  get elem() {
    return this.#elem;
  }

  clickEvent = (id) => {
    const event = new CustomEvent("product-add", {
      detail: id,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  };

  initCarousel() {
    let currentSlide = 0;
    let slidesAmount = this.#slides.length;

    let carouselInner = this.elem.querySelector(".carousel__inner");
    let arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    let arrowRight = this.elem.querySelector(".carousel__arrow_right");

    arrowLeft.style.display = "none";

    if (slidesAmount == 0 || slidesAmount == 1) {
      arrowLeft.style.display = "none";
      arrowRight.style.display = "none";
    }

    const switchSlide = () => {
      let offset = -carouselInner.offsetWidth * currentSlide;
      console.log(carouselInner.offsetWidth);
      carouselInner.style.transform = `translateX(${offset}px)`;

      if (currentSlide === 0) {
        arrowLeft.style.display = "none";
      } else {
        arrowLeft.style.display = "";
      }
      if (currentSlide === slidesAmount - 1) {
        arrowRight.style.display = "none";
      } else {
        arrowRight.style.display = "";
      }
    };

    this.elem.addEventListener("click", ({ target }) => {
      if (target.closest(".carousel__arrow_left")) {
        currentSlide--;
        switchSlide();
      }
      if (target.closest(".carousel__arrow_right")) {
        currentSlide++;
        switchSlide();
      }
    });
  }

  render() {
    const template = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.#slides
          .map(
            ({ name, price, image, id }) => `
        <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`
          )
          .join("")}
      </div>
    </div>
    `);
    this.#elem = template;

    this.#slides.forEach(({ id }) => {
      this.elem
        .querySelector(`[data-id="${id}"]`)
        .addEventListener("click", () => {
          this.clickEvent(id);
        });
    });
    this.initCarousel();
  }
}
