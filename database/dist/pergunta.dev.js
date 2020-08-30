"use strict";

var connection = require('./database');

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var Pergunta = connection.define('pergunta', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});
Pergunta.sync({
  force: false
}).then(function () {
  console.log('Table created');
})["catch"](function (err) {
  console.log(err);
});
module.exports = Pergunta;