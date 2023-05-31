const {
  knex
} = require('../database')

module.exports = {
  async insertProdutos(produto, dimensoes, fornecedor, detalhes, valor, quantidade) {
    await knex.transaction(async knex => {
      await knex.raw(`
      insert into st_lote (d_data_inicio,id_fornecedor)
      values (sysdate(),${fornecedor})
      `);
      const id_lote = await knex.raw(`
      SELECT LAST_INSERT_ID() ID_LOTE
      `)
      console.log(id_lote[0][0].ID)
      await knex.raw(`
      insert into st_produto_lote (n_quantidade,s_detalhes,s_dimensao,n_valor,id_lote,id_produto)
      values (${quantidade},'${detalhes}','${dimensoes}',${valor},${id_lote[0][0].ID_LOTE},${produto})
      `);
    });
  },
  async consultaTipo() {
    const tipo = await knex.raw(`
    select * from st_tipo where s_ativo = 'S'
    `);
    return tipo[0]
  },
  async consultaFornecedor() {
    const fornecedor = await knex.raw(`
    select * from st_fornecedor where s_ativo = 'S'
    `);
    return fornecedor[0]
  }
}