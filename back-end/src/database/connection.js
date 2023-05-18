// Configurações da aplicação
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  conexao: {
    client: 'oracledb',
    connection: {
      host: 'localhost:1522/softdb',
      user: 'SFWSTENAR',
      password: 'SFWSTENAR',
      database: 'softdb'
    },
    pool: {
      min: 0,
      max: 10
    },
    fetchAsString: ['number', 'clob'],
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  }
/*
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }*/

};


/*//ORCL - BASE ANTIGA - SOFTRACK SERVER E JUNGS
//SOFTDB - BASE NOVA - SOFTRACK*/