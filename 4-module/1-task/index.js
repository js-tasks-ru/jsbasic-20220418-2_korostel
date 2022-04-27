function makeFriendsList(friends) {
  // ваш код...
  const ul = document.createElement("ul");
  ul.innerHTML = friends.reduce((acc, { firstName, lastName }) => {
    return acc + `<li>${firstName} ${lastName}</li>`;
  }, "");
  return ul;
}
