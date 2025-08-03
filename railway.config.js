// Configuración específica para Railway
module.exports = {
  // Verificar si estamos en Railway
  isRailway: () => {
    return process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID;
  },

  // Obtener configuración de base de datos
  getDatabaseConfig: () => {
    const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID;
    const hasDatabaseUrl = process.env.DATABASE_URL && process.env.DATABASE_URL !== '';

    if (isRailway && hasDatabaseUrl) {
      return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: true
      };
    } else {
      return {
        type: 'sqlite',
        storage: './database.sqlite'
      };
    }
  },

  // Verificar configuración
  validateConfig: () => {
    const errors = [];
    
    // Solo validar NODE_ENV si estamos en Railway
    const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID;
    
    if (isRailway) {
      if (!process.env.NODE_ENV) {
        errors.push('NODE_ENV no está definido');
      }
      
      // Solo validar DATABASE_URL si estamos en Railway y no está definido
      if (!process.env.DATABASE_URL) {
        console.log('⚠️  ADVERTENCIA: DATABASE_URL no está definido en Railway');
        console.log('💡 Para solucionarlo:');
        console.log('   1. Ve a Railway → Tu proyecto → Pestaña "Data"');
        console.log('   2. Crea una nueva base de datos PostgreSQL');
        console.log('   3. Railway configurará automáticamente DATABASE_URL');
        console.log('   4. Redespliega el proyecto');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}; 