import elements from "./elements";

export const getInput = () => {
  const what = elements.inputSwitch.checked;
  const name = elements.inputName.value;
  const weight = what === true ? elements.inputUnit.value : 0;
  const quantity = what === false ? elements.inputUnit.value : 0;
  const category = elements.inputCategory.value;
  return { name, weight, quantity, category };
};

const createDomElement = (id,name,quantity,weight) => {
  return (`<li class="item" product_id=${id} draggable="true">
  <div class="product">${name}</div>
  <div class="weight">${weight !==0 ? weight + "kg" : ""}</div>
  <div class="quantity">${quantity !==0 ? quantity : ""}</div>
  <div class="edit_delete">
    <button aria-label="Edytuj" class="edit">
      <img src="./images/edit.svg" alt="edytuj" />
    </button>
    <button aria-label="Usuń" class="delete">
      <img src="./images/bin.svg" alt="kosz" />
    </button>
  </div>
</li>`);
}

export const displayProduct = (id, name, quantity, weight, category) => {
  const parent = document.getElementById(category).querySelector(".list");
  const DOMElement = createDomElement(id,name,quantity,weight);
  parent.insertAdjacentHTML("beforeend", DOMElement);
};
export const viewDeleteProduct = (product_id) => {
  const element = document.querySelector('[product_id="' + product_id + '"]');
  if(element){
  element.parentNode.removeChild(element);
  }
};

export const viewMoveProduct = (id,name,quantity,weight,product_id) => {
  const DOMElement = createDomElement(id,name,quantity,weight);
  const destinationElement = document.querySelector('[product_id="' + product_id + '"]');
  destinationElement.insertAdjacentHTML("beforebegin", DOMElement);
}

export const clearInputs = () => {
  elements.inputName.value = "";
  elements.inputUnit.value = "";
  elements.inputSwitch.checked = false;
};
export const insertProductToInputs = ({ name, quantity, weight, category }) => {
  if (weight) {
    elements.inputSwitch.checked = false;
    elements.inputUnit.value = weight;
  } else {
    elements.inputUnit.value = quantity;
  }
  elements.inputName.value = name;
  elements.inputCategory.value = category;
};
export const highlightProduct = (product_id) => {
  const element = document.querySelector('[product_id="' + product_id + '"]');
  element.classList.add("selected");
};
export const removeHighlight = () => {
  const element = document.querySelector(".selected");
  if (element) {
    element.classList.remove("selected");
  }
};

export const dragoveHighlight = (product_id)=>{
  const element = document.querySelector('[product_id="' + product_id + '"]');
  if(element){
  element.classList.add("dragover");
  }
}
export const removeDragoverHighlight = (product_id)=>{
  if(product_id){
    const element = document.querySelector('[product_id="' + product_id + '"]');
    if(element?.classList.contains("dragover")){
      element.classList.remove("dragover");
    }
  }
}
