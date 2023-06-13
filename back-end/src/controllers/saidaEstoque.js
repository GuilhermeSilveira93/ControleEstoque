const {
  knex
} = require('../database')

module.exports = {
  async saidaProdutos(id_lote,produto, dimensoes, detalhes, valor, quantidade) {
    await knex.transaction(async knex => {
      try {
        await knex.raw(`
        insert into st_produto_lote (n_quantidade,s_detalhes,s_dimensao,n_valor,id_lote,id_produto)
        values (${quantidade},'${detalhes}','${dimensoes}',${valor},${id_lote},${produto})
        `); 
      } catch (error) {
        console.log(error)
      }
    });
  },
  async consultaEmpresa() {
    const empresa = await knex.raw(`
    select * from st_empresa where s_ativo = 'S'
    `);
    return empresa[0]
  },
  async consultaClientes(id_empresa) {
    const clientes = await knex.raw(`
    select * from st_cliente where id_empresa = ${id_empresa}
    `);
    return clientes[0]
  },
  async consultaProduto() {
    const produto = await knex.raw(`
    select * from st_produto where s_ativo = 'S'
    `);
    return produto[0]
  },
  async insertLote(cliente){
    await knex.raw(`
    insert into st_lote (d_data_inicio,id_cliente)
    values
    (sysdate(),${cliente})
    `);
    const id_lote = await knex.raw(`
      SELECT LAST_INSERT_ID() ID_LOTE
      `)
    return id_lote[0]
  }
}