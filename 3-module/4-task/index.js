function showSalary(users, age) {
  // ваш код...
  const filteredUsers = users.filter((user) => user.age <= age);
  return filteredUsers.reduce(
    (acc, user, id) =>
      id < filteredUsers.length - 1
        ? acc + `${user.name}, ${user.balance}\n`
        : acc + `${user.name}, ${user.balance}`,
    ""
  );
}
