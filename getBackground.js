const imageURL =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=donut";
const cryptoURL = "https://api.coingecko.com/api/v3/coins/bitcoin";

const getBackground = async () => {
  const resp = await fetch(imageURL);
  const data = await resp.json();
  return data;
};

export { getBackground };
