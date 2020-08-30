const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');
connection
    .authenticate()
    .then(() => {
        console.log("Success");

    })
    .catch((err) => {
        console.log(err)
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get('/', (req, res) => {

    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    })
        .then(perguntas => {
            res.render('index', {
                perguntas: perguntas
            });


        })

});

app.get('/perguntar', (req, res) => {

    res.render('pergunta');
});


app.post('/save-question', (req, res) => {
    var title = req.body.title;
    var message = req.body.message;
    Pergunta.create({
        title: title,
        message: message
    }).then(() => {
        res.redirect('/');
    })
})
app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {

            Resposta.findAll({
                 where: { perguntaId: pergunta.id },
                order:[['id','DESC']]
             }).then(respostas => {
                res.render('perguntado', {
                    pergunta: pergunta,
                    respostas: respostas
                })

            })
        } else {
            res.render('found')
        }
    })
})

app.post('/answer', (req, res) => {
    const body = req.body.question;
    const pergunta = req.body.questionid;


    Resposta.create({
        body: body,
        perguntaId: pergunta
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId);
    }).catch(err => {
        console.log(err)
    })
})
app.listen(4000);


