export default class List {
  constructor(productList) {
    this.productList = productList;
  }
  addItem(item) {
    this.productList.push(item);
  }
  removeItem(id) {
    const index = this.productList.findIndex((el) => el.id == id);
    if(index>-1){
    this.productList.splice(index, 1);
    }
  }
  sortList(productId,destinationLocationId){
    const productIndex = this.productList.findIndex(el=>el.id==productId);
    const [product] = this.productList.splice(productIndex,1)
    const destinationProduct = this.productList.find(el=>el.id==destinationLocationId);

    if(product.category!==destinationProduct.category){
      product.category=destinationProduct.category;
    }
    const destinationIndex = this.productList.findIndex(el=>el.id==destinationLocationId);
    this.productList.splice(destinationIndex,0,product);
    return product;
  }
  getNewId() {
    if (this.productList[0]) {
      const ids = this.productList.map(el=>el.id).sort((a,b)=>a-b);
      return ids[ids.length-1]+1;
    }
    return 1;
  }
  getSum(what) {
    if (this.productList.length > 1) {
      return this.productList
        .map((el) => el[what])
        .reduce((a, b) => (a+b));
    } else if (this.productList.length === 1) {
      const num = this.productList[0][what];
      return num ? num : 0;
    } else {
      return 0;
    }
  }
  getProductById(id) {
    const index = this.productList.findIndex((el) => el.id == id);
    return this.productList[index];
  }
}
