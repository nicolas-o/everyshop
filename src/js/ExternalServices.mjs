const baseURL = "https://fakestoreapi.com/";

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getCategoryList() {
    const response = await fetch(baseURL + `products/categories`);
    const data = await convertToJson(response);
    return data;
  }

  async getData(category) {
    const response = await fetch(baseURL + `products/category/${category}`);
    const data = await convertToJson(response);
    return data;
  }

  async findProductById(id) {
    const response = await fetch(baseURL + `products/${id}`);
    const data = await convertToJson(response);
    return data;
  }
  /**
   * Send an order to the server for processing
   * @param {object} payload The order data
   * @returns a bool signifying the request was successful
   */
}
