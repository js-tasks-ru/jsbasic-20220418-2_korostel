export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    if (!product) return;
    let item = this.cartItems.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (item) {
      item.count += 1;
    } else {
      this.cartItems.push({
        product,
        count: 1,
      });
    }
    this.onProductUpdate(item);
  }

  updateProductCount(productId, amount) {
    // ваш код
    let item = this.cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );
    item.count += amount;
    item.count === 0 && this.cartItems.splice(this.cartItems.indexOf(item), 1);
    this.onProductUpdate(item);
  }

  isEmpty() {
    // ваш код
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // ваш код
    return this.cartItems.reduce((acc, item) => {
      return acc + item.count;
    }, 0);
  }

  getTotalPrice() {
    // ваш код
    return this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.count,
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}
