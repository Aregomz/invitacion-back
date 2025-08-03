const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RSVP = sequelize.define('RSVP', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'event_id',
    references: {
      model: 'events',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('confirmed', 'pending', 'declined'),
    defaultValue: 'pending',
    allowNull: false,
    validate: {
      isIn: {
        args: [['confirmed', 'pending', 'declined']],
        msg: 'El estado debe ser confirmed, pending o declined'
      }
    }
  },
  responseDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'response_date'
  }
}, {
  tableName: 'rsvps',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'event_id']
    }
  ]
});

module.exports = RSVP; 