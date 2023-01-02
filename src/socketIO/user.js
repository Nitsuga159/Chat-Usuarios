const { setUser } = require("../db");

module.exports = {
  getUserId: (socket) => socket.emit("user:socket-id", socket.id),
  registerUser: (socket) => {
    socket.on("user:registration", (user) => setUser(user));
  },
};
