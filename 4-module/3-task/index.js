function highlight(table) {
  // ваш код...
  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    const statusCell = table.rows[i].cells[3];
    const genderCell = table.rows[i].cells[2].textContent;
    const ageCell = table.rows[i].cells[1].textContent;
    if (statusCell.hasAttribute("data-available")) {
      statusCell.dataset.available === "true"
        ? row.classList.add("available")
        : row.classList.add("unavailable");
    } else {
      row.hidden = true;
    }
    genderCell === "m"
      ? row.classList.add("male")
      : row.classList.add("female");
    if (ageCell < 18) row.style.textDecoration = "line-through";
  }
}
