export const icons = {
  ":mate": "👻",
  ":nico": "🍋",
  ":juli": "🐥",
  ":david": "🐀",
  ":tomi": "🍅",
  ":rome": "🤡",
  ":mati": "🗿",
};

export const modificate = {
  ":party ": (text) => `<span class="party-animation">${text}</span>`,
  ":bold ": (text) => `<strong>${text}</strong>`,
  ":enlace ": (src) =>
    `<a href="${src}" target="_blank" rel="noreferrer" style="color: white;">Link</a>`,
  ":imagen ": (src) =>
    `<img class="image-message" src=${src} alt=${crypto.randomUUID()} />`,
};
