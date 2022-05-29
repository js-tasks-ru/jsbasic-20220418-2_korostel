export default function promiseClick(button) {
  // ваш код...
  return new Promise((resolve, reject) =>
    button.addEventListener("click", (e) => {
      resolve(e);
    }, {
      once: true,
    })
  );
}
