function toggleText() {
  const btn = document.querySelector(".toggle-text-button");
  btn.addEventListener("click", () => {
    const text = document.getElementById("text");
    text.hidden = !text.hidden;
  });
}
