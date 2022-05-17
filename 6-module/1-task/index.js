/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows;
  #elem;

  constructor(rows) {
    this.#rows = rows;
    this.#elem = document.createElement("table");
    this.makeHTML();
  }
  get elem() {
    return this.#elem;
  }
  makeHTML() {
    let s =
      `      
      <thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
      </thead>
      <tbody>` +
      this.#rows
        .map(
          (e) => `
      <tr>
          <td>${e.name}</td>
          <td>${e.age}</td>
          <td>${e.salary}</td>
          <td>${e.city}</td>
          <td><button>X</button></td>
      </tr>              
              `
        )
        .join("") +
      `</tbody>`;
    this.#elem.innerHTML = s;
    for (let b of this.#elem.querySelectorAll("button")) {
      b.addEventListener("click", this, { once: true });
    }
  }
  handleEvent(event) {
    let row = event.target.parentElement.parentElement; // event.target указывает на нажатую кнопку
    this.#rows.splice(row.rowIndex - 1, 1); // this указывает на свой экземпляр класса
    row.remove();
    console.log(this.#rows); // Тестирование
  }
}
