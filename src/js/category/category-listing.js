import ExternalServices from "../ExternalServices.mjs";
import CategoryList from "./CategoryList.mjs";
import { qs } from "../main.js";

const categoryData = new ExternalServices();
const categoryList = new CategoryList(categoryData, qs(".category-list"));
pageInit();

function pageInit() {
  categoryList.init();
}
