function namify(users) {
  // ваш код...
  return users.reduce((acc, user) => {
    acc.push(user.name);
    return acc;
  }, []);
}
