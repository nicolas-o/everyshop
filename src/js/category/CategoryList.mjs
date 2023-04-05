import { renderListWithTemplate } from "../main.js";

function productCardTemplate(category) {
  return `<li class="category-box">
          <a href="/pages/productListing.html?category=${category}">
            <img src="img/${category}.jpg" alt="" class="category-img" />
          </a>
          <h2 class="category-title">${category.toUpperCase()}</h2>
        </li>`;
}

export default class CategoryListing {
  constructor(categoryData, listElement) {
    this.categoryData = categoryData;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.categoryData.getCategoryList();

    // render the list
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterBegin",
      true
    );
  }
}
