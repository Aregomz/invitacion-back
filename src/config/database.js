const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '../config.env' });

// Configuración para Railway (PostgreSQL) o local (SQLite)
const isProduction = process.env.NODE_ENV === 'production';
const hasDatabaseUrl = process.env.DATABASE_URL && process.env.DATABASE_URL !== '';

let sequelize;

if (isProduction && hasDatabaseUrl) {
  // Configuración para Railway con PostgreSQL
  console.log('🔗 Configurando PostgreSQL para Railway...');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  });
} else {
  // Configuración local con SQLite
  console.log('🔗 Configurando SQLite para desarrollo local...');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  });
}

module.exports = sequelize; 