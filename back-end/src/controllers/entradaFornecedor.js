const {
  knex
} = require('../database')

module.exports = {
  async inserirFornecedor(S_NOME) {
    await knex.transaction(async knex => {
      try {
        await knex.raw(`
        insert into st_fornecedor (S_NOME) VALUES ('${S_NOME}');
        `);
      } catch (error) {
        console.log(error)
      }
    });
  },
}