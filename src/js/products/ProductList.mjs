import { productTemplate } from "./ProductDetails.mjs";
import { renderListWithTemplate, currencyFormatter } from "../main.js";
import shoppingCart from "../shoppingCart.mjs";

function productCardTemplate(product) {
  return `<li class="product-box">
  <a href="#">
    <img src="${
      product.image
    }" alt="" class="product-img product-card__view" data-id=${
    product.id
  } class="product-img" />
  </a>
  <h2 class="product-title">${product.title.toUpperCase()}</h2>
  <p class="price">${currencyFormatter(product.price)}</p>
  <i class='bx bx-shopping-bag add-cart'></i>
</li>`;
}

export default class ProductListing {
  constructor(product, dataSource, listElement) {
    this.product = product;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.cart = new shoppingCart();
  }
  async init() {
    const list = await this.dataSource.getData(this.product);

    // render the list
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterBegin",
      true
    );

    document
      .querySelectorAll(".product-card__view")
      .forEach((elem) =>
        elem.addEventListener("click", (e) => this.displayModal(e))
      );

    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
      var button = addCart[i];
      button.addEventListener("click", this.cart.addToCart);
    }
  }
  // // TODO: Create a method that inserts HTML into a modal for each product listing
  async displayModal(e) {
    let id = e.target.dataset.id;
    let product = await this.dataSource.findProductById(id);
    let modal = document.querySelector(".modal");
    let modalContent = document.querySelector(".product-detail");
    let html = productTemplate(product);
    modalContent.insertAdjacentHTML("beforeend", html);
    modal.style.display = "block";
    document.querySelector(".close-modal").addEventListener("click", () => {
      modal.style.display = "none";
      modalContent.innerHTML = "";
    });
  }
}
