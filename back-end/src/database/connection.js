// Configurações da aplicação
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  conexao1: {
    client: 'mysql',
    connection: {
      host: '192.168.0.32',
      port:3306,
      user: 'cliente',
      password: 'mudar@123@123',
      database: 'stock_sftk',
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
  },
  conexao2: {
    client: 'oracledb',
    connection: {
      host: 'localhost:1521/orcl',
      user: 'SFWSTJSOLAR',
      password: 'SFWSTJSOLAR',
      database: 'orcl'
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