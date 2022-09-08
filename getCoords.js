import { getLocation } from "./utility/getLocation.js";

const getCoords = async () => {
  const location = await getLocation();
  const { latitude, longitude } = location.coords;
  return { latitude, longitude };
};

export { getCoords };
