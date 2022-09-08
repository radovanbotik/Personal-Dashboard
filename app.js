import { getElement } from "./utility/getElement.js";
import { getBackground } from "./getBackground.js";
import { getCrypto } from "./getCrypto.js";
import { getTime } from "./utility/getTime.js";
import { getWeather } from "./getWeather.js";

const timeSection = getElement(".time-section");
const authorSection = getElement(".author-section");
const cryptoSection = getElement(".crypto-section");
const weatherSection = getElement(".weather-section");

const imageURL =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=donut";
const cryptoURL = "https://api.coingecko.com/api/v3/coins/bitcoin";
const weatherURL = "https://apis.scrimba.com/openweathermap/data/2.5/weather";

// const getBackground = async () => {
//   const resp = await fetch(imageURL);
//   const data = await resp.json();
//   return data;
// };
// const getCrypto = async () => {
//   const resp = await fetch(cryptoURL);
//   if (resp.ok) {
//     const data = await resp.json();
//     return data;
//   } else {
//     throw new Error("error while fetching from gecko");
//   }
// };

// const getTime = () => {
//   const newDate = new Date();
//   const currentTime = newDate.toLocaleTimeString("sk-SK");
//   timeSection.textContent = currentTime;
// };

// const getLocation = () => {
//   return new Promise((resolved, rejected) => {
//     navigator.geolocation.getCurrentPosition(resolved);
//   });
// };
// const getCoords = async () => {
//   const location = await getLocation();
//   const { latitude, longitude } = location.coords;
//   return { latitude, longitude };
// };

// const getWeather = async () => {
//   const coordsData = await getCoords();
//   const resp = await fetch(
//     `${weatherURL}?lat=${coordsData.latitude}&lon=${coordsData.longitude}&units=metric`
//   );
//   const data = await resp.json();
//   const { name: city } = data;
//   const { temp } = data.main;
//   const { main, description, icon } = data.weather[0];
//   return { main, description, icon, city, temp };
// };

const updateDOM = async () => {
  try {
    const imageData = await getBackground();
    const cryptoData = await getCrypto();
    const weatherData = await getWeather();

    //handling background image
    document.body.style.backgroundImage = `url(${imageData.urls.regular})`;
    authorSection.textContent = `Image credit: ${imageData.user.name}`;

    //handling crypto-section
    cryptoSection.innerHTML = `
    <div class="crypto-header">
      <img
        src="${cryptoData.image.small}"
        alt="${cryptoData.name}"
        class="crypto-image"
      />
      <h4 class="crypto-name">${cryptoData.name}</h4>
    </div>
    <div class="crypto-market">
      <p>current price: ${cryptoData.market_data.current_price.eur}</p>
      <p>price high : ${cryptoData.market_data.high_24h.eur}</p>
      <p>price low : ${cryptoData.market_data.low_24h.eur}</p>
    </div>
    `;

    //update Time DOM
    setInterval(() => {
      timeSection.textContent = getTime();
    }, 1000);

    //handling weather
    weatherSection.innerHTML = `
    <header class='weather-header'>
    <img src='http://openweathermap.org/img/wn/${weatherData.icon}@2x.png' class="weather-icon"></img>
    <div class="weather-temperature">${weatherData.temp}°C</div>
    <div class="weather-main">${weatherData.main}</div>
    </header>
    <footer class='weather-footer'>
    <div class="weather-city">${weatherData.city}</div>
    <div class="weather-description">${weatherData.description}</div>
    </footer>
    `;
  } catch (error) {
    document.body.style.backgroundImage =
      'url("https://images.unsplash.com/photo-1593445203635-af51d171f25e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjI1NjA0NTg&ixlib=rb-1.2.1&q=80&w=1080")';
    throw new Error(error);
  }
};

updateDOM();
