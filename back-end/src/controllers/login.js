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
      const chave = await knex.raw(`
      select * from st_usuario where s_email = '${email}'
      and s_senha = '${senha}'
      `);
      return chave[0]
    } catch (error) {
      console.log(error)
    }
},
}