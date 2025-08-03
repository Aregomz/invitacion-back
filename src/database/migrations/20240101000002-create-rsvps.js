'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rsvps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('confirmed', 'pending', 'declined'),
        defaultValue: 'pending',
        allowNull: false
      },
      responseDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Crear índice único para userId y eventId
    await queryInterface.addIndex('rsvps', ['userId', 'eventId'], {
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rsvps');
  }
}; 