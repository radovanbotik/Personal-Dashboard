const authorName = document.querySelector("#authorName");

const URL =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=donut";

const fetchData = async () => {
  const resp = await fetch(URL);
  const data = await resp.json();
  return data;
};

const updateDOM = async () => {
  const imageData = await fetchData();
  document.body.style.backgroundImage = `url(${imageData.urls.regular})`;
  authorName.textContent = `Image credit: ${imageData.user.name}`;
};

updateDOM();
