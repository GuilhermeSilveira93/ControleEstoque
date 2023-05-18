const { knex, knex2 } = require('../database')
module.exports = {
  async configGrafico() {
    const consulta = knex.raw(`
    consulta****
    `)
    return consulta
  }
}