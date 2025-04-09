exports.getUsers = () => {
  return [
    {
      id: 1,
      name: 'Ilya',
    },
    {
      id: 2,
      name: 'Lisa',
    },
  ];
};

exports.getUser = (userId) => {
  console.log(userId, '<---'); // TODO: add DB logiv
  return [
    {
      id: 1,
      name: 'Ilya',
    },
  ];
};

exports.createUser = (userId, userName) => {
  return [
    {
      id: userId,
      name: userName,
      createAt: new Date(),
    },
  ];
};
