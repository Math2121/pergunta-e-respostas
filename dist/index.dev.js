"use strict";

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var connection = require('./database/database');

var Pergunta = require('./database/Pergunta');

var Resposta = require('./database/Resposta');

connection.authenticate().then(function () {
  console.log("Success");
})["catch"](function (err) {
  console.log(err);
});
app.set('view engine', 'ejs');
app.use(express["static"]('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.get('/', function (req, res) {
  Pergunta.findAll({
    raw: true,
    order: [['id', 'DESC']]
  }).then(function (perguntas) {
    res.render('index', {
      perguntas: perguntas
    });
  });
});
app.get('/perguntar', function (req, res) {
  res.render('pergunta');
});
app.post('/save-question', function (req, res) {
  var title = req.body.title;
  var message = req.body.message;
  Pergunta.create({
    title: title,
    message: message
  }).then(function () {
    res.redirect('/');
  });
});
app.get('/pergunta/:id', function (req, res) {
  var id = req.params.id;
  Pergunta.findOne({
    where: {
      id: id
    }
  }).then(function (pergunta) {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: {
          perguntaId: pergunta.id
        },
        order: [['id', 'DESC']]
      }).then(function (respostas) {
        res.render('perguntado', {
          pergunta: pergunta,
          respostas: respostas
        });
      });
    } else {
      res.render('found');
    }
  });
});
app.post('/answer', function (req, res) {
  var body = req.body.question;
  var pergunta = req.body.questionid;
  Resposta.create({
    body: body,
    perguntaId: pergunta
  }).then(function () {
    res.redirect('/pergunta/' + perguntaId);
  })["catch"](function (err) {
    console.log(err);
  });
});
app.listen(4000);