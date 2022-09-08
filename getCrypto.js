const cryptoURL = "https://api.coingecko.com/api/v3/coins/bitcoin";

const getCrypto = async () => {
  const resp = await fetch(cryptoURL);
  if (resp.ok) {
    const data = await resp.json();
    return data;
  } else {
    throw new Error("error while fetching from gecko");
  }
};

export { getCrypto };
