const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre es requerido'
      },
      len: {
        args: [2, 50],
        msg: 'El nombre debe tener entre 2 y 50 caracteres'
      },
      is: {
        args: /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/,
        msg: 'El nombre solo puede contener letras, espacios y caracteres especiales (áéíóúñ)'
      }
    }
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        msg: 'El teléfono es requerido'
      },
      len: {
        args: [10, 10],
        msg: 'El teléfono debe tener exactamente 10 dígitos'
      },
      is: {
        args: /^\d{10}$/,
        msg: 'El teléfono solo puede contener números'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: {
        msg: 'El formato del email no es válido'
      }
    }
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User; 