import elements from "./elements";

export const updateSums = (wtSum, qtSum) => {
  elements.weightSum.innerHTML = `${wtSum} kg`;
  elements.quantitySum.innerHTML = qtSum;
};
