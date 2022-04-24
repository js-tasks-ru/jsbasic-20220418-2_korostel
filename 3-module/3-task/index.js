function camelize(str) {
  // ваш код...
  return str
    .split("-")
    .reduce((acc, item) =>
      item ? acc + item.replace(item[0], item[0].toUpperCase()) : acc
    );
}
