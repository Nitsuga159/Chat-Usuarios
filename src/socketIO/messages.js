const { setUserMessage, getUsersMessages } = require("../db");

const noTypingMessage = ({ socket }) => {
  socket.on("chat:no-typing", (data) => {
    socket.broadcast.emit("chat:no-user-typing", data);
  });
};

const getMessages = (socket) => {
  socket.emit("chat:get-all-messages", getUsersMessages());
};

const typingMessage = ({ socket }) => {
  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:user-typing", data);
  });
};

const setMessage = ({ socket, io }) => {
  socket.on("chat:send-message", (message) => {
    io.emit("chat:get-one-message", setUserMessage(message));
    socket.broadcast.emit("chat:no-user-typing", message);
  });
};

module.exports = {
  setMessage,
  getMessages,
  typingMessage,
  noTypingMessage,
};
