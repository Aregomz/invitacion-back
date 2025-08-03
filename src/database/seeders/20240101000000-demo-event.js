'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('events', [{
      id: 1,
      title: '¡ESTÁS INVITADO!',
      date: '2025-08-08',
      time: '19:00:00',
      location: 'Avenida Alta Luz 2001',
      description: '',
      target_date: '2025-08-08T19:00:00.000Z',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('events', null, {});
  }
}; 