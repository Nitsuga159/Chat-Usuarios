const app = require("./App");
const SocketIO = require("socket.io");
const { conexionsActive } = require("./socketIO/conexions");
const {
  incrementConexionsActive,
  decrementConexionsActive,
  getConexionsActive,
  resetUsers,
  resetUsersMessages,
} = require("./db");
const { getUserId, registerUser } = require("./socketIO/user");
const {
  setMessage,
  getMessages,
  typingMessage,
  noTypingMessage,
} = require("./socketIO/messages");

const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port: ${process.env.PORT || 3001}`);
});

const io = SocketIO(server);

io.on("connection", (socket) => {
  console.log("Conectándose al servidor");

  incrementConexionsActive();
  conexionsActive(io);

  getUserId(socket);
  registerUser(socket);

  setMessage({ socket, io });

  getMessages(socket);

  typingMessage({ socket, io });
  noTypingMessage({ socket, io });

  socket.on("disconnect", () => {
    decrementConexionsActive();
    conexionsActive(io);

    if (!getConexionsActive()) {
      resetUsers();
      resetUsersMessages();
    }

    console.log("Usuario desconectado");
  });
});
