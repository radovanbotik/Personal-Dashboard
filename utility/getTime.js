const getTime = () => {
  const newDate = new Date();
  const currentTime = newDate.toLocaleTimeString("sk-SK");
  return currentTime;
};

export { getTime };
