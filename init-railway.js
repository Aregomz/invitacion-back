const sequelize = require('./src/config/database');
const { User, Event, RSVP } = require('./src/models');

async function initializeDatabase() {
  try {
    console.log('🔄 Inicializando base de datos...');
    
    // Sincronizar modelos
    await sequelize.sync({ force: true });
    console.log('✅ Modelos sincronizados');
    
    // Crear evento de prueba
    const event = await Event.create({
      title: '¡ESTÁS INVITADO!',
      date: '2025-08-08',
      time: '19:00:00',
      location: 'Avenida Alta Luz 2001',
      description: '',
      targetDate: new Date('2025-08-08T19:00:00.000Z'),
      isActive: true
    });
    
    console.log('✅ Evento de prueba creado:', event.title);
    console.log('🎉 Base de datos inicializada correctamente');
    
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  }
}

// Ejecutar si es el archivo principal
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase; 