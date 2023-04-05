import { currencyFormatter } from "../main.js";
import shoppingCart from "../shoppingCart.mjs";

export default class productDetails {
  /**
   * Create a new instance of productDetails to handle product pages
   * @param {string} productId The id of the product to display
   * @param {object} dataSource An instance of ShoppingCart
   */
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.cart = new shoppingCart();
  }

  /**
   * Fetch the product, render the details to the page, and set the click action for
   * the add to cart button.
   */

  /**
   * Take the fetched product and process the details to display to the user.
   * @param {product} product The product to display
   */
}

/**
 * Create the product details html
 * @param {*} product The product to display
 * @returns An html formatted string to insert into the page
 */
export function productTemplate(product) {
  console.log(product);
  return `<div class="product-modal-container"><h3>${product.title}</h3>
  <img src="${product.image}" alt="${
    product.description
  }" class="product-img" />
  <hr>
  <br>
  <p class="product__description"><span>Description:</span> ${
    product.description
  }</p>
  <p class="product-card__price">Price Price: ${currencyFormatter(
    product.price
  )}</p>
  <p class="product__rating"><span>Rate:</span> ${product.rating.rate}</p>
  <p class="product__rating"><span>Reviews:</span> ${
    product.rating.count
  } <i class='bx bxs-star bx-flip-horizontal bx-tada' style='color:#ffbc00'  ></i> </p>  
</div>
  `;
}

/**
 * A curried template function for building the product detail html
 * @param {*} item the product to display
 * @param {*} slides an array containing each slide
 * @param {*} dots an array containing each dot for the carousel
 * @returns An html formatted string for displaying product details
 */
