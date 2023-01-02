import renderChat from "./chat/renderChat.js";
import AJAX from "./helpers/AJAX.js";

const d = document;
const main = d.querySelector("main");

const formEvent = (e) => {
  e.preventDefault();
  renderChat(e.target.username.value, main);
};

d.addEventListener("DOMContentLoaded", () => {
  const success = (response) => {
    main.innerHTML = response;

    const form = main.querySelector("#form-username");

    form.addEventListener("submit", formEvent);
  };

  AJAX({
    path: "./home/home.html",
    success,
    error: (error) =>
      (main.innerHTML = `<h2>Error ${error.status}: ${error.statusText}</h2>`),
  });
});
