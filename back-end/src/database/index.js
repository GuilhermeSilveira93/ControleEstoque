const conexoes = require('./connection')//temos que subir 2 pastas e pegar esse arquivo, que contem a conexão
const knex = require('knex')(conexoes.conexao1)
//require('knex') retorna uma função, por isso chamos o development, para passar para o knex

module.exports = {knex} //exportamos para poder usar depois