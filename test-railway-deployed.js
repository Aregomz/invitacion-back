const axios = require('axios');

// Reemplaza con tu URL real de Railway
const RAILWAY_URL = 'https://tu-proyecto.railway.app';

async function testRailwayDeployment() {
  console.log('🧪 Probando despliegue en Railway...\n');
  console.log(`📍 URL: ${RAILWAY_URL}\n`);

  try {
    // Test 1: Verificar que el servidor esté funcionando
    console.log('1️⃣ Verificando que el servidor esté funcionando...');
    const healthResponse = await axios.get(`${RAILWAY_URL}/health`);
    console.log('✅ Servidor funcionando:', healthResponse.data);
    console.log('\n');

    // Test 2: Verificar endpoint raíz
    console.log('2️⃣ Verificando endpoint raíz...');
    const rootResponse = await axios.get(`${RAILWAY_URL}/`);
    console.log('✅ Endpoint raíz:', rootResponse.data);
    console.log('\n');

    // Test 3: Confirmar asistencia
    console.log('3️⃣ Probando confirmación de asistencia...');
    const rsvpData = {
      name: 'María González',
      phone: '5512345679'
    };

    const rsvpResponse = await axios.post(`${RAILWAY_URL}/api/rsvp`, rsvpData);
    console.log('✅ Confirmación exitosa:', rsvpResponse.data);
    console.log('\n');

    // Test 4: Verificar registro
    console.log('4️⃣ Verificando registro...');
    const checkResponse = await axios.get(`${RAILWAY_URL}/api/rsvp/check/5512345679`);
    console.log('✅ Verificación exitosa:', checkResponse.data);
    console.log('\n');

    console.log('🎉 ¡Todos los tests pasaron! El backend está funcionando correctamente en Railway.');

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Respuesta:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
      console.error('Verifica que la URL de Railway sea correcta');
    } else {
      console.error('Error de configuración:', error.message);
    }
  }
}

// Ejecutar las pruebas
testRailwayDeployment(); 