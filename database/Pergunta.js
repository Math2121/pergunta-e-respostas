
const connection = require('./database');
const { Sequelize } = require('sequelize');

const Pergunta = connection.define('pergunta',{
    title:{
        type: Sequelize.STRING,
        allowNull:false
    },
    message:{
        type:Sequelize.TEXT,
        allowNull:false
    }

})

Pergunta.sync({force:false})
    .then(()=>{
    console.log('Table created')
})
    .catch((err)=>{
    console.log(err)
})

module.exports = Pergunta;