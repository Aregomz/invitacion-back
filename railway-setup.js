#!/usr/bin/env node

console.log('🚀 Configurando Railway...\n');

// Verificar variables de entorno
console.log('📋 Variables de entorno:');
console.log(`NODE_ENV: ${process.env.NODE_ENV || 'no definido'}`);
console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? 'definido' : 'no definido'}`);
console.log(`PORT: ${process.env.PORT || 'no definido'}`);

// Verificar si estamos en Railway
const isRailway = process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID;
console.log(`Railway Environment: ${isRailway ? 'Sí' : 'No'}`);

if (!process.env.DATABASE_URL) {
  console.log('\n⚠️  ADVERTENCIA: DATABASE_URL no está definido');
  console.log('💡 En Railway, necesitas:');
  console.log('   1. Ir a la pestaña "Data"');
  console.log('   2. Crear una nueva base de datos PostgreSQL');
  console.log('   3. Railway configurará automáticamente DATABASE_URL');
}

console.log('\n✅ Configuración completada'); 