const getLocation = () => {
  return new Promise((resolved, rejected) => {
    navigator.geolocation.getCurrentPosition(resolved);
  });
};

export { getLocation };
