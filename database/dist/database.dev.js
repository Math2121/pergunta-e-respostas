"use strict";

var Sequelize = require('sequelize');

var connection = new Sequelize('perguntas', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
module.exports = connection;