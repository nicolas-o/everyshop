import ExternalServices from "../ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { qs, getParam, capitalize } from "../main.js";

const category = getParam("category");
const dataSource = new ExternalServices(category);
const productList = new ProductList(category, dataSource, qs(".product-list"));

pageInit();

function pageInit() {
  productList.init();

  qs("#sub-title").insertAdjacentHTML("beforeend", capitalize(category));
  qs("title").insertAdjacentHTML("beforeend", capitalize(category));
}
