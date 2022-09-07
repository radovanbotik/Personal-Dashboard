const authorName = document.querySelector("#authorName");

const imageURL =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=donut";
const cryptoURL = "https://api.coingecko.com/api/v3/coins/bitcoin";

const fetchBackground = async () => {
  const resp = await fetch(imageURL);
  const data = await resp.json();
  return data;
};
const fetchCrypto = async () => {
  const resp = await fetch(cryptoURL);
  if (resp.ok) {
    const data = await resp.json();
    console.log(data);
    return data;
  } else {
    throw new Error("error while fetching from gecko");
  }
};

const updateDOM = async () => {
  try {
    const imageData = await fetchBackground();
    const crypToData = await fetchCrypto();
    document.body.style.backgroundImage = `url(${imageData.urls.regular})`;
    authorName.textContent = `Image credit: ${imageData.user.name}`;
  } catch (error) {
    document.body.style.backgroundImage =
      'url("https://images.unsplash.com/photo-1593445203635-af51d171f25e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI1NjA0NTg&ixlib=rb-1.2.1&q=80&w=1080")';
    throw new Error(error);
  }
};

updateDOM();
