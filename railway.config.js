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
    
    if (!process.env.NODE_ENV) {
      errors.push('NODE_ENV no está definido');
    }
    
    const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID;
    if (isRailway && !process.env.DATABASE_URL) {
      errors.push('DATABASE_URL no está definido en Railway');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}; 