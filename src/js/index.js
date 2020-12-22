import Product from "./models/Product";
import List from "./models/List";

import elements from "./views/elements";
import {
  getInput,
  displayProduct,
  viewDeleteProduct,
  viewMoveProduct,
  clearInputs,
  insertProductToInputs,
  highlightProduct,
  removeHighlight,
  dragoveHighlight,
  removeDragoverHighlight
} from "./views/productsViews";
import { showHideCategory } from "./views/categoryViews";
import { updateSums } from "./views/sumViews";

let edited_product_id = undefined;

const setupEventListeners = () => {

  elements.productList.addEventListener("click", (event) => {
    if (event.target.src) {
      if (event.target.parentNode.classList[0] === "delete") {
        controlDeleteProduct(
          event.target.parentNode.parentNode.parentNode.getAttribute(
            "product_id"
          )
        );
      } else if (event.target.parentNode.classList[0] === "edit") {
        controlEditProductInit(
          event.target.parentNode.parentNode.parentNode.getAttribute(
            "product_id"
          )
        );
      }
    }
  });

  //DRAGGING LISTENERS

  let draggedID,draggedOnID;

  elements.productList.addEventListener("dragstart",e=>{
    const id = e.target.getAttribute("product_id");
    if(id){
      const parsed = parseInt(id);
      draggedID = parsed;
    }
  });
  elements.productList.addEventListener("dragover",e=>{
    const id = e.target.getAttribute("product_id");
    if(id){
      const parsed = parseInt(id);
      draggedOnID=parsed;
    }
  });

  elements.productList.addEventListener("dragend",e=>{
    e.preventDefault();
    if(draggedID === draggedOnID) return;
    const {id,name,quantity,weight} = list.sortList(draggedID,draggedOnID);
    viewDeleteProduct(draggedID);
    viewMoveProduct(id,name,quantity,weight,draggedOnID);
    showHideCategory();
    setList(list.productList);
  });


  elements.productList.addEventListener("dragenter",e=>{
    e.stopPropagation();
    const id = e.target.getAttribute("product_id");
    dragoveHighlight(id);
  })
  elements.productList.addEventListener("dragleave", e=>{
    e.stopPropagation();
    const id = e.target.getAttribute("product_id");
    removeDragoverHighlight(id);
  })

  elements.submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (edited_product_id) {
      controlEditProduct();
    } else {
      controlAddProduct();
    }
  });

};

/*---- LOCAL STORAGE FUNCTIONS ----*/

const getList = () => {
  const list = window.localStorage.getItem("mdb_shopping_list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
};
const setList = (list) => {
  window.localStorage.setItem("mdb_shopping_list", JSON.stringify(list));
};

/*---- APP CONTROLLERS ----*/

const clearApp = () => {
  edited_product_id = undefined;
  removeHighlight();

  showHideCategory();
  clearInputs();
};

const controlUpdateSums = () => {
  const wtSum = list.getSum("weight");
  const qtSum = list.getSum("quantity");
  updateSums(wtSum, qtSum);
};

const controlAddProduct = () => {

  const { name, weight, quantity, category } = getInput();
  if (!name || (!weight && !quantity)) {
    return;
  }

  const id = list.getNewId();

  const product = new Product(id, name, quantity, weight, category);
  list.addItem(product);

  displayProduct(id, name, quantity, weight, category);

  clearApp();
  controlUpdateSums();

  setList(list.productList);
};

const controlDeleteProduct = (product_id) => {
  list.removeItem(product_id);

  viewDeleteProduct(product_id);
  showHideCategory();
  controlUpdateSums();

  setList(list.productList);
};
const controlEditProductInit = (product_id) => {
  clearApp();
  const product = list.getProductById(product_id);

  highlightProduct(product_id);
  insertProductToInputs(product);
  edited_product_id = product_id;
};
const controlEditProduct = () => {
  list.removeItem(edited_product_id);
  viewDeleteProduct(edited_product_id);

  const { name, weight, quantity, category } = getInput();
  if (!name || (!weight && !quantity)) {
    return;
  }
  const id = edited_product_id;
  const product = new Product(id, name, quantity, weight, category);
  list.addItem(product);
  displayProduct(id, name, quantity, weight, category);

  clearApp();
  controlUpdateSums();

  setList(list.productList);
};

const controlRenderList = () => {
  list.productList.forEach((el) => {
    displayProduct(el.id, el.name, el.quantity, el.weight, el.category);
  });
};

/*----APP STARTUP----*/

const list = new List(getList());
setupEventListeners();
controlRenderList();
controlUpdateSums();
showHideCategory();
