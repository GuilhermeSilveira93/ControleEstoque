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
    order by s_nome
    `);
    return empresa[0]
  },
  async consultaClientes(id_empresa) {
    const clientes = await knex.raw(`
    select * from st_cliente where id_empresa = ${id_empresa}
    order by s_nome
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
  },
  async relatorioSaida(inicio, fim, empresa, cliente, produto) {
    relatorioSaida = await knex.raw(`
      select pro.S_NOME as PRODUTO,prlo.N_QUANTIDADE as QUANTIDADE,emp.S_NOME as EMPRESA,cl.S_NOME as CLIENTE,lt.ID_LOTE as ID_LOTE,DATE_FORMAT(lt.D_DATA_INICIO, '%d/%m/%Y') as DATA
      from st_lote lt, st_produto pro, st_produto_lote prlo,st_cliente cl,st_empresa emp
      where lt.ID_LOTE = prlo.ID_LOTE
      and cl.ID_CLIENTE = lt.ID_CLIENTE
      ${cliente !== '0' ? `and cl.ID_CLIENTE = ${cliente}` : ''}
      and cl.ID_EMPRESA = emp.ID_EMPRESA
      ${empresa !== '0' ? `and emp.ID_EMPRESA = ${empresa}` : ''}
      and prlo.ID_PRODUTO = pro.ID_PRODUTO
      ${produto !== '0' ? `and pro.ID_PRODUTO = ${produto}` : ''}
      and lt.D_DATA_INICIO between '${inicio}' and '${fim}'
      order by DATA
    `)
    return relatorioSaida[0]
  }
}