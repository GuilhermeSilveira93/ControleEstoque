const {knex} = require('../database')
module.exports = {
    async chave(email) {
      try {
        const chave = await knex.raw(`
        select S_CHAVE from st_usuario where s_email = '${email}'
        `);
        return chave[0]
      } catch (error) {
        console.log(error)
      }
  },
  async validacao(email,senha) {
    try {
      const login = await knex.raw(`
      select * from st_usuario where s_email = '${email}'
      and s_senha = '${senha}'
      `);
      return login[0]
    } catch (error) {
      console.log(error)
    }
},
  async permicoes(idGrupo){
    try {
      const grupo = await knex.raw(`
      select PAGINA,LISTAR,INCLUIR,EDITAR,EXCLUIR,ATRIBUIR
      from vw_item_menu
      where idgrupo = ${idGrupo}
      `)
      return grupo[0]
    } catch (err) {
      console.log(err)
    }
  }
}