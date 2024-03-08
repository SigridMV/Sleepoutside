// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const storedData = localStorage.getItem(key);
  if (storedData === null) {
    return [];
  }
  try {
    const parsedData = JSON.parse(storedData);

    if (Array.isArray(parsedData)) {
      return parsedData;
    } else {
      return [parsedData];
    }
  } catch (error) {
    console.error(
      "Error al analizar los datos del almacenamiento local:",
      error,
    );
    return [];
  }
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
