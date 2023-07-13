const {
  knex
} = require('../database')

module.exports = {
  async insertProdutos(id_lote, produto, dimensoes, detalhes, valor, quantidade) {
    await knex.transaction(async knex => {
      try {
        await knex.raw(`
        insert into st_produto_lote (n_quantidade,s_detalhes,s_dimensao,n_valor,id_lote,id_produto)
        values (${quantidade},'${detalhes}','${dimensoes}','${valor}',${id_lote},${produto})
        `);
      } catch (error) {
        console.log(error)
      }
    });
  },
  async consultaTipo() {
    const tipo = await knex.raw(`
    select * from st_tipo where s_ativo = 'S'
    order by s_nome
    `);
    return tipo[0]
  },
  async consultaFornecedor() {
    const fornecedor = await knex.raw(`
    select * from st_fornecedor where s_ativo = 'S'
    order by s_nome
    `);
    return fornecedor[0]
  },
  async consultaProduto(id_produto) {
    if (id_produto) {
      const produto = await knex.raw(`
      select p.ID_PRODUTO, p.S_NOME, case when e.qtd is null then 0 else e.qtd end QTD
      from vw_estoque e right join st_produto p on e.id_produto = p.id_produto
      where p.id_produto = ${id_produto}
      order by p.S_NOME
      `);
      return produto[0]
    } else {
      const produto = await knex.raw(`
    select p.ID_PRODUTO, p.S_NOME, case when e.qtd is null then 0 else e.qtd end QTD
    from vw_estoque e right join st_produto p on e.id_produto = p.id_produto
    order by p.S_NOME
    `);
      return produto[0]
    }
  },
  async insertLote(fornecedor) {
    await knex.raw(`
    insert into st_lote (d_data_inicio,id_fornecedor)
    values
    (sysdate(),${fornecedor})
    `);
    const id_lote = await knex.raw(`
      SELECT LAST_INSERT_ID() ID_LOTE
      `)
    return id_lote[0]
  },
  async relatorioEntrada(inicio,fim,fornecedor,produto) {
    relatorioEntrada = await knex.raw(`
    select pro.S_NOME as PRODUTO,prlo.N_QUANTIDADE as QUANTIDADE,forn.S_NOME as FORNECEDOR,lt.ID_LOTE as ID_LOTE,DATE_FORMAT(lt.D_DATA_INICIO, '%d/%m/%Y') as DATA
    from st_lote lt, st_produto pro, st_produto_lote prlo,st_fornecedor forn
    where lt.ID_LOTE = prlo.ID_LOTE
    and lt.ID_FORNECEDOR = forn.ID_FORNECEDOR
    ${fornecedor !== '0' ? `and forn.ID_FORNECEDOR = ${fornecedor}` : ''}
    and prlo.ID_PRODUTO = pro.ID_PRODUTO
    ${produto !== '0' ? `and pro.ID_PRODUTO = ${produto}` : ''}
    and lt.D_DATA_INICIO between '${inicio}' and '${fim}'
    order by DATA
    `)
    return relatorioEntrada[0]
  }
}