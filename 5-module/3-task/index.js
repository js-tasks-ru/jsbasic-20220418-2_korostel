function initCarousel() {
  // ваш код...
  const rightButton = document.querySelector(".carousel__arrow_right");
  const leftButton = document.querySelector(".carousel__arrow_left");
  const carouselInner = document.querySelector(".carousel__inner");
  const slides = carouselInner.querySelectorAll(".carousel__slide");
  const translateSize = carouselInner.offsetWidth;
  if (slides.length == 0 || slides.length == 1) {
    rightButton.style.display = "none";
    leftButton.style.display = "none";
  }
  leftButton.style.display = "none";
  rightButton.addEventListener("click", () => {
    const matrix = new WebKitCSSMatrix(
      window.getComputedStyle(carouselInner).transform
    );
    const translateToLeft = matrix.m41 - translateSize;
    carouselInner.style.transform = `translateX(${translateToLeft + "px"})`;
    if (matrix.m41 == -translateSize * (slides.length - 2)) {
      rightButton.style.display = "none";
    }
    leftButton.style.display = "";
  });
  leftButton.addEventListener("click", () => {
    const matrix = new WebKitCSSMatrix(
      window.getComputedStyle(carouselInner).transform
    );
    const translateToRigth = matrix.m41 + translateSize;
    console.log(matrix.m41);
    carouselInner.style.transform = `translateX(${translateToRigth + "px"})`;
    if (matrix.m41 == -translateSize) {
      leftButton.style.display = "none";
    }
    rightButton.style.display = "";
  });
}
