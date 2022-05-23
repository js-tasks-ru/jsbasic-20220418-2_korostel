import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  #elem = null;
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  get elem() {
    return this.#elem;
  }

  render() {
    this.#elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
        <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
      </div>
    </div>`);
    this.renderCards();
  }
  renderCards() {
    const productsGridInner = this.elem.querySelector('.products-grid__inner');
    // console.log(productsGridInner);
    productsGridInner.innerHTML = "";
    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) continue;
      if (this.filters.vegeterianOnly && !product.vegeterian) continue;
      if (
        void 0 !== this.filters.maxSpiciness &&
        product.spiciness > this.filters.maxSpiciness
      )
        continue;
      if (this.filters.category && product.category != this.filters.category)
        continue;
      let card = new ProductCard(product);
      productsGridInner.append(card.elem);
    }
  }
  updateFilter(filter) {
    Object.assign(this.filters, filter);
    this.renderCards();
  }
}
