import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  modal = null;
  #body = null;

  #modalTitle = null;
  #modalBody = null;

  constructor() {
    this.#body = document.querySelector("body");
    this.render();
  }

  render() {
    this.modal = createElement(`
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="./assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
          </h3>
        </div>

        <div class="modal__body"></div>
      </div>

    </div>`);
  }

  setTitle(value) {
    this.#modalTitle = value;
    this.modal.querySelector('.modal__title').textContent = this.#modalTitle;
  }

  setBody(value) {
    this.#modalBody = value.outerHTML;
    this.modal.querySelector('.modal__body').innerHTML = this.#modalBody;
  }

  #closeEvent = () =>{
    document.addEventListener('keydown', (({ code })=>{
      if (code === 'Escape') {
        this.close();
      }
    }), { once: true });
  }

  open() {
    this.#body.append(this.modal);
    this.#body.classList.add("is-modal-open");
    this.#closeEvent();
    this.modal.querySelector(".modal__close").addEventListener(
      "click",
      () => {
        this.close();
      },
      { once: true }
    );
  }

  close() {
    this.modal.remove();
    this.#body.classList.remove("is-modal-open");
  }
}
