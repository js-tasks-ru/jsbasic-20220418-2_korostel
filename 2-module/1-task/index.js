function sumSalary(obj = {}) {
  return Object.values(obj).reduce((acc, item) => {
    if (typeof item === "number" && isFinite(item) && !isNaN(item)) {
      acc += item;
    }
    return acc;
  }, 0);
}
