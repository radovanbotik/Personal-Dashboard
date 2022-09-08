import { getCoords } from "./getCoords.js";

const weatherURL = "https://apis.scrimba.com/openweathermap/data/2.5/weather";

const getWeather = async () => {
  const coordsData = await getCoords();
  const resp = await fetch(
    `${weatherURL}?lat=${coordsData.latitude}&lon=${coordsData.longitude}&units=metric`
  );
  const data = await resp.json();
  const { name: city } = data;
  const { temp } = data.main;
  const { main, description, icon } = data.weather[0];
  return { main, description, icon, city, temp };
};

export { getWeather };
