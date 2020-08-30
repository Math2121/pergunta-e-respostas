"use strict";

var connection = require('./database');

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var Resposta = connection.define('respostas', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
Resposta.sync({
  force: false
});
module.exports = Resposta;