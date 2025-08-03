const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config({ path: './config.env' });

// Importar configuración de base de datos y modelos
const sequelize = require('./config/database');
const { User, Event, RSVP } = require('./models');

// Importar rutas
const eventRoutes = require('./routes/eventRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');

// Importar middleware de errores
const errorHandler = require('./middleware/errorHandler');

// Importar configuración de Railway
const railwayConfig = require('../railway.config');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // máximo 100 requests por ventana
  message: {
    success: false,
    message: 'Demasiadas solicitudes, inténtalo de nuevo más tarde'
  }
});

// Middleware de seguridad y logging
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(morgan('combined'));

// Middleware para parsing de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas de la API
app.use('/api/events', eventRoutes);
app.use('/api/rsvp', rsvpRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: railwayConfig.isRailway() ? 'PostgreSQL' : 'SQLite'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Invitaciones de Fiestas',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      events: '/api/events',
      rsvp: '/api/rsvp',
      health: '/health'
    }
  });
});

// Middleware para manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

// Función para inicializar la base de datos y el servidor
const initializeServer = async () => {
  try {
    // Validar configuración
    const configValidation = railwayConfig.validateConfig();
    if (!configValidation.isValid) {
      console.error('❌ Error de configuración:');
      configValidation.errors.forEach(error => console.error(`   - ${error}`));
      process.exit(1);
    }

    console.log('✅ Configuración válida');

    // Sincronizar la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    
    // Sincronizar modelos (crear tablas si no existen)
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados correctamente.');
    
    // Verificar si hay eventos activos, si no, crear uno
    const activeEvent = await Event.findOne({ where: { isActive: true } });
    if (!activeEvent) {
      console.log('🔄 Creando evento activo por defecto...');
      await Event.create({
        title: '¡ESTÁS INVITADO!',
        date: '2025-08-08',
        time: '19:00:00',
        location: 'Avenida Alta Luz 2001',
        description: '',
        targetDate: new Date('2025-08-08T19:00:00.000Z'),
        isActive: true
      });
      console.log('✅ Evento activo creado');
    }
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado en el puerto ${PORT}`);
      console.log(`📱 API disponible en http://localhost:${PORT}`);
      console.log(`🔗 Endpoints principales:`);
      console.log(`   - GET /api/events/:id`);
      console.log(`   - GET /api/events/:id/countdown`);
      console.log(`   - POST /api/rsvp`);
      console.log(`   - GET /api/rsvp/check/:phone`);
      console.log(`   - GET /api/events/:id/guests`);
    });
  } catch (error) {
    console.error('❌ Error al inicializar el servidor:', error);
    process.exit(1);
  }
};

// Manejo de señales para cierre graceful
process.on('SIGINT', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Cerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

// Inicializar el servidor
initializeServer(); 