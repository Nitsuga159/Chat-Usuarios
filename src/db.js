const handleDb = (function () {
  let conexionsActive = 0;

  /*
    {
      socketId: string,
      username: string,
      isActive: boolean
    }
  */
  let users = [];

  /*
    {
      username: string,
      socketId: string,
      message: string,
      createdAt: string
    }
  */
  let usersMessages = [];

  //Methods

  const getConexionsActive = () => conexionsActive;
  const decrementConexionsActive = () => --conexionsActive;
  const incrementConexionsActive = () => ++conexionsActive;

  const getUsers = () => JSON.parse(JSON.stringify(users));
  const setUser = (user) => {
    users.push(user);
    return user;
  };
  const resetUsers = () => (users = []);

  const getUsersMessages = () => JSON.parse(JSON.stringify(usersMessages));
  const setUserMessage = (message) => {
    usersMessages.push(message);
    return message;
  };
  const resetUsersMessages = () => (usersMessages = []);

  return {
    getConexionsActive,
    getUsers,
    getUsersMessages,
    decrementConexionsActive,
    incrementConexionsActive,
    resetUsers,
    resetUsersMessages,
    setUser,
    setUserMessage,
  };
})();

module.exports = handleDb;
