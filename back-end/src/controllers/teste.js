const { knex } = require('../database')

module.exports = {
  async teste() {
    const resultado = await knex.raw('SELECT ID_PRODUTO FROM ST_PRODUTO');
    return resultado[0]
  }
}