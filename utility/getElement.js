const getElement = selector => {
  if (document.querySelector(selector)) {
    return document.querySelector(selector);
  } else {
    console.log("Provided selector does not exist. Check your selector again.");
  }
};

export { getElement };
