const { knex } = require('../database')

module.exports = {
  async teste() {
    const resultado = await knex.raw(`select * from st_produto`);
    return resultado
  }
}