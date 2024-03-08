// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  const storedData = localStorage.getItem(key);
  try {
    const parsedData = JSON.parse(storedData);
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Error getLocalStorage", error);
    return []; 
  }
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
    updateCartView();
  });
  
  element.addEventListener("click", () => {
    callback();
    updateCartView();
  });

  function updateCartView() {
    const cartItems = getLocalStorage("so-cart");
    const cartContainer = qs(".cart-items");
    cartContainer.innerHTML = "";
  
    cartItems.forEach((item) => {
      const cartItemElement = document.createElement("li");
      cartItemElement.textContent = `${item.Name} - $${item.FinalPrice}`;
      cartContainer.appendChild(cartItemElement);
    });
  }
}
