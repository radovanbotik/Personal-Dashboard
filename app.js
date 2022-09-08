const timeBody = document.querySelector(".time-body");
const authorName = document.querySelector("#authorName");
const cryptoImage = document.querySelector(".crypto-image");
const cryptoName = document.querySelector(".crypto-name");
const cryptoHeader = document.querySelector(".crypto-header");
const cryptoMarket = document.querySelector(".crypto-market");

const imageURL =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=donut";
const cryptoURL = "https://api.coingecko.com/api/v3/coins/bitcoin";
const weatherURL = "https://apis.scrimba.com/openweathermap/data/2.5/weather";

const fetchBackground = async () => {
  const resp = await fetch(imageURL);
  const data = await resp.json();
  return data;
};
const getCrypto = async () => {
  const resp = await fetch(cryptoURL);
  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    throw new Error("error while fetching from gecko");
  }
};

const getTime = () => {
  const newDate = new Date();
  const currentTime = newDate.toLocaleTimeString("sk-SK");
  timeBody.textContent = currentTime;
};

// const getLocation = navigator.geolocation.getCurrentPosition(position => {
//   const { latitude, longitude } = position.coords;
//   return position.coords;
// });

const getLocation = () => {
  return new Promise((resolved, rejected) => {
    navigator.geolocation.getCurrentPosition(resolved);
  });
};
const getCoords = async () => {
  const location = await getLocation();
  const { latitude, longitude } = location.coords;
  return { latitude, longitude };
};

const getWeather = async () => {
  const coordsData = await getCoords();
  const resp = await fetch(
    `${weatherURL}?lat=${coordsData.latitude}&lon=${coordsData.longitude}&units=metric`
  );
  const data = await resp.json();
  console.log(data);
};

getWeather();
const updateDOM = async () => {
  try {
    const imageData = await fetchBackground();
    const cryptoData = await getCrypto();
    // const getWeather = await getCoords();
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
    setInterval(getTime, 1000);
    //handle user location

    // const weather = getWeather(getLocation);
  } catch (error) {
    document.body.style.backgroundImage =
      'url("https://images.unsplash.com/photo-1593445203635-af51d171f25e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI1NjA0NTg&ixlib=rb-1.2.1&q=80&w=1080")';
    throw new Error(error);
  }
};

updateDOM();
