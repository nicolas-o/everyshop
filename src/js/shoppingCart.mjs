import {
  qs,
  getLocalStorage,
  renderListWithTemplate,
  addProductToCart,
  updatetotal,
} from "./main.js";

// shoppingCart class for handling cart actions
export default class shoppingCart {
  /**
   * Render the current cart contents using a template
   */
  renderCartContents() {
    const cart = getLocalStorage("so-cart") ?? [];
    renderListWithTemplate(
      cartItemTemplate,
      qs(".product-list"),
      cart,
      "afterbegin",
      true
    );
    // call the displayTotalCart() function
    this.displayTotalCart(cart);
  }
  /**
   * Add an item to the cart. If the item already
   * exists in the cart, increase its quantity.
   * @param {*} product
   */
  addToCart(product) {
    // Add To cart
    var button = product.target;
    var shopProducts = button.parentElement;
    var title =
      shopProducts.getElementsByClassName("product-title")[0].innerText;
    alert(`${title} was added to your cart.`);
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
  }

  /**
   * Calculate the total cart value and display it in .cart-footer
   * @param {array} cart
   */
  displayTotalCart(cart) {
    if (cart.length > 0) {
      // Display the HTML section "cart-footer" and show the total amount to pay for the items
      const total = cart.reduce(
        (sum, current) => sum + current.FinalPrice * current.Quantity,
        0
      );
      qs(".cart-footer").style.display = "block";
      const totalElem = qs("#total-in-cart");
      totalElem.innerHTML = `Total: $${total.toFixed(2)}`;
    } else {
      qs(".cart-footer").style.display = "none";
    }
  }
}

/**
 * Create an HTML string with details from the cart item.
 * Automatically selects the quantity option.
 * @param {*} item
 * @returns an HTML string
 */
function cartItemTemplate(item) {
  console.log(item);
  // Create the options
  let options = [],
    option = (num) => `<option value="${num}">${num}</option>`;
  for (let i = 0; i < 9; i++) options.push(option(i + 1));

  return `<li class="cart-card divider">
    <a href="../pages/productPages.html?product=${
      item.Id
    }" class="cart-card__image">
      <img
        src="${item.image || item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="../pages/productPages.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <label class="cart-card__quantity" for="quantity">Qty: 
      <select id="quantity-${item.Id}" data-id="${
    item.Id
  }" data-function="quantity">
        <option value="${item.Quantity}" selected disabled hidden>${
    item.Quantity
  }</option>
        ${options.join("").trim()}
        <option value="10+">10+</option>
      </select>
      <input type="number" id="quantity-plus-${item.Id}" data-id="${
    item.Id
  }" hidden>
    </label>
    <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(
      2
    )}</p>
    <button class="cart-card__remove" data-id="${
      item.Id
    }" data-function="remove" title="Remove from cart">
    &times;
    </button>
  </li>`;
}
