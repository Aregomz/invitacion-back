require('dotenv').config({ path: '../../config.env' });

module.exports = {
  development: {
    username: null,
    password: null,
    database: null,
    host: null,
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || './database.sqlite',
    logging: console.log
  },
  test: {
    username: null,
    password: null,
    database: null,
    host: null,
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false
  }
}; 