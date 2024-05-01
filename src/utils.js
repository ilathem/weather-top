export const createDiv = className => {
  const element = document.createElement('div');
  element.classList.add(className);
  return element;
}

export const createText = (className, text, parent = null) => {
  const element = document.createElement('p');
  element.innerText = text;
  element.classList.add(className);
  if (parent) parent.appendChild(element);
  return element;
}