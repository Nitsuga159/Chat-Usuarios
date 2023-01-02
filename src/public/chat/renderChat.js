import AJAX from "../helpers/AJAX.js";

export default (username, main) => {
  AJAX({
    path: "./chat/chat.html",
    success: (response) => {
      main.innerHTML = response;

      const chat = document.getElementById("chat");

      handleSocketIO(username);

      const scrollToEnd = setInterval(
        () =>
          chat.scrollTop !== 0
            ? clearInterval(scrollToEnd)
            : (chat.scrollTop = chat.scrollHeight),
        100
      );
    },
    error: (error) =>
      (main.innerHTML = `<h2>Error ${error.status}: ${error.statusText}</h2>`),
  });
};

function handleSocketIO(username) {
  const io = window.io();
  const d = document;
  const chat = d.getElementById("chat");
  const formMessage = d.getElementById("form-message");
  const inputChat = d.getElementById("input-chat");
  const sendButton = d.getElementById("send-button");
  const conexionsActive = d.getElementById("conexions-active");

  let socketId = "";
  let setTimeOutIo = null;

  const sendFormMessage = () => {
    const message =
      inputChat.value.at(-1) === "\n"
        ? inputChat.value.slice(0, -1)
        : inputChat.value;
    inputChat.value = "";

    if (!message || /^\s+$/.test(message)) return;

    io.emit("chat:send-message", {
      username,
      message,
      createdAt: new Date().toLocaleTimeString().slice(0, -3),
      socketId,
    });
  };

  formMessage.addEventListener(
    "keyup",
    (e) => {
      if (e.key !== "Enter" || e.shiftKey) return;

      sendFormMessage();
    },
    true
  );

  sendButton.addEventListener("click", sendFormMessage);

  inputChat.addEventListener("keyup", (e) => {
    const value = e.target.value;
    sendButton.disabled = !value || /^\s+$/.test(value);

    if (e.key === "Enter" && !e.shiftKey) return;

    clearTimeout(setTimeOutIo);

    io.emit("chat:typing", { username, socketId });

    setTimeOutIo = setTimeout(() => {
      io.emit("chat:no-typing", { username, socketId });
    }, 3000);
  });

  io.on("conexions:active", (value) => (conexionsActive.textContent = value));

  io.on("user:socket-id", (id) => {
    socketId = id;
    io.emit("user:registration", { username, socketId, isActive: true });
  });

  io.on("chat:get-one-message", (data) => {
    chat.innerHTML +=
      `<p id="typing" class="is-typing hidden"></p>` +
      templateMessage(data, socketId);
  });

  io.on("chat:get-all-messages", (messages) => {
    chat.innerHTML =
      `<p id="typing" class="is-typing hidden"></p>` +
      messages.map((data) => templateMessage(data, socketId)).join("");
  });

  io.on("chat:user-typing", ({ username, socketId }) => {
    const typing = d.getElementById("typing");
    typing.dataset.socketId = socketId;
    typing.textContent = `${username} está escribiendo...`;
    typing.classList.remove("hidden");
  });

  io.on("chat:no-user-typing", ({ socketId }) => {
    const typing = d.getElementById("typing");

    const socketIdTyping = typing.dataset.socketId;

    if (socketIdTyping === socketId) typing.classList.add("hidden");
  });
}

function templateMessage(data, socketId) {
  return `
    <div class="${`message ${
      data.socketId === socketId ? "my-message" : ""
    }`.trim()}">
      <h5 class="username-message">${
        data.socketId === socketId ? "Vos" : data.username
      }</h5>
      <div class="${`${
        data.socketId === socketId
          ? "my-message-container"
          : "message-container"
      }`}">
        <p class="message-text">${data.message
          .replace("\n", "<br />")
          .replace(":mate", "👻")
          .replace(":nico", "🍋")
          .replace(":juli", "🐥")
          .replace(":david", "🐀")
          .replace(":tomi", "🍅")
          .replace(":rome", "🤡")
          .replace(":mati", "🗿")}</p>
        <span class="date-message">${data.createdAt}</span>
      </div>
    </div>
  `;
}
