function getMinMax(str) {
  // ваш код...
  const arr = str.split(" ").filter((item) => !isNaN(item));
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
}
