const {
  knex
} = require('../database')

module.exports = {
  async SaidaBar() {
      try {
        const saidaBar = await knex.raw(`
        select pd.S_NOME PRODUTO, sum(plt.N_QUANTIDADE) as QUANTIDADE
        from st_lote lt, st_produto_lote plt, st_produto pd
        where lt.ID_LOTE = plt.ID_LOTE
        and plt.ID_PRODUTO = pd.ID_PRODUTO
        and lt.ID_CLIENTE is not null
        GROUP BY pd.S_NOME
        `);
        return saidaBar[0]
      } catch (error) {
        console.log(error)
      }
  },
  async SaidaPie() {
    try {
      const saidaPie = await knex.raw(`
      select pd.S_NOME "name", sum(plt.N_QUANTIDADE) "value"
      from st_lote lt, st_produto_lote plt, st_produto pd
      where lt.ID_LOTE = plt.ID_LOTE
      and plt.ID_PRODUTO = pd.ID_PRODUTO
      and lt.ID_CLIENTE is not null
      GROUP BY pd.S_NOME
      `);
      return saidaPie[0]
    } catch (error) {
      console.log(error)
    }
},
async EntradaBar() {
  try {
    const EntradaBar = await knex.raw(`
    select pd.S_NOME PRODUTO, sum(plt.N_QUANTIDADE) as QUANTIDADE
    from st_lote lt, st_produto_lote plt, st_produto pd
    where lt.ID_LOTE = plt.ID_LOTE
    and plt.ID_PRODUTO = pd.ID_PRODUTO
    and lt.ID_CLIENTE is null
    GROUP BY pd.S_NOME
    order by 2
    `);
    return EntradaBar[0]
  } catch (error) {
    console.log(error)
  }
},
async EntradaPie() {
  try {
    const Entrada = await knex.raw(`
    select pd.S_NOME "name", sum(plt.N_QUANTIDADE) "value"
    from st_lote lt, st_produto_lote plt, st_produto pd
    where lt.ID_LOTE = plt.ID_LOTE
    and plt.ID_PRODUTO = pd.ID_PRODUTO
    and lt.ID_CLIENTE is null
    GROUP BY pd.S_NOME
    `);
    return Entrada[0]
  } catch (error) {
    console.log(error)
  }
},
}