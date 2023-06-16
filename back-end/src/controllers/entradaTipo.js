const {
  knex
} = require('../database')

module.exports = {
    async entradaTipo(novoTipo) {
    await knex.transaction(async knex => {
      try {
        await knex.raw(`
        insert into st_tipo (S_NOME) VALUES ('${novoTipo}');
        `);
      } catch (error) {
        console.log(error)
      }
    });
  },
}