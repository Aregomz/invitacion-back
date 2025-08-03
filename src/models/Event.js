const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El título es requerido'
      }
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La fecha es requerida'
      },
      isDate: {
        msg: 'La fecha debe tener un formato válido'
      }
    }
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La hora es requerida'
      }
    }
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La ubicación es requerida'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  targetDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'target_date',
    validate: {
      notEmpty: {
        msg: 'La fecha objetivo es requerida'
      },
      isDate: {
        msg: 'La fecha objetivo debe tener un formato válido'
      }
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    field: 'is_active'
  }
}, {
  tableName: 'events',
  timestamps: true
});

module.exports = Event; 