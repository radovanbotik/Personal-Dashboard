const timeBody = document.querySelector(".time-body");
const authorName = document.querySelector("#authorName");
const cryptoImage = document.querySelector(".crypto-image");
const cryptoName = document.querySelector(".crypto-name");
const cryptoHeader = document.querySelector(".crypto-header");
const cryptoMarket = document.querySelector(".crypto-market");

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
    return data;
  } else {
    throw new Error("error while fetching from gecko");
  }
};

const renderTime = () => {
  const newDate = new Date();
  const currentTime = newDate.toLocaleTimeString("sk-SK");
  timeBody.textContent = currentTime;
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
  });
};
getLocation();
const updateDOM = async () => {
  try {
    const imageData = await fetchBackground();
    const cryptoData = await fetchCrypto();
    //handling background image
    document.body.style.backgroundImage = `url(${imageData.urls.regular})`;
    authorName.textContent = `Image credit: ${imageData.user.name}`;
    //handling crypto header (crypto logo+crypto title)
    cryptoHeader.innerHTML = `
    <img src="${cryptoData.image.small}" alt="${cryptoData.name}" class="crypto-image" />
    <h4 class="crypto-name">${cryptoData.name}</h4>
    `;
    //handling crypto market prices
    cryptoMarket.innerHTML = `
    <p>current price: ${cryptoData.market_data.current_price.eur}</p>
    <p>price high : ${cryptoData.market_data.high_24h.eur}</p>
    <p>price low : ${cryptoData.market_data.low_24h.eur}</p>
    `;
    //update Time DOM
    setInterval(renderTime, 1000);
  } catch (error) {
    document.body.style.backgroundImage =
      'url("https://images.unsplash.com/photo-1593445203635-af51d171f25e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI1NjA0NTg&ixlib=rb-1.2.1&q=80&w=1080")';
    throw new Error(error);
  }
};

updateDOM();
