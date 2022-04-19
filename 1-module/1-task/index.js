function factorial(n) {
  // ваш код...
  let fact = 1;
  if (fact >= n) return fact;
  for (let i = 2; i <= n; i++) {
    fact *= i;
  }
  return fact;
}
