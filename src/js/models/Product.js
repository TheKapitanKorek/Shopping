export default class Product {
  constructor(id, name, quantity, weight, category) {
    this.id = id;
    this.name = name;
    this.quantity = quantity ? parseInt(quantity) : 0;
    this.weight = weight ? parseInt(weight) : 0;
    this.category = category;
  }
}
