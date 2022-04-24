function filterRange(arr, a, b) {
  // ваш код...
  return arr.filter((item) => (a < b) ? item >= a && item <= b : item >= b && item <= a);
}
