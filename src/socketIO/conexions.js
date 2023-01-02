const { getConexionsActive } = require("../db");

module.exports = {
  conexionsActive: (io) => io.emit("conexions:active", getConexionsActive()),
};
