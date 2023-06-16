const {
  knex
} = require('../database')

module.exports = {
  async inserirProduto(novoProduto,idTipo,serial) {
    await knex.transaction(async knex => {
      try {
        await knex.raw(`
        insert into st_produto (S_NOME,N_SERIAL,ID_TIPO) VALUES ('${novoProduto}','${serial}',${idTipo});
        `);
      } catch (error) {
        console.log(error)
      }
    });
  },
}