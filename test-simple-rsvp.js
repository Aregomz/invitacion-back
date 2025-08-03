const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testSimpleRSVP() {
  console.log('🧪 Probando RSVP simplificado...\n');

  try {
    // Test 1: Confirmar asistencia con solo nombre y teléfono
    console.log('1️⃣ Probando confirmación de asistencia...');
    const rsvpData = {
      name: 'Juan Pérez',
      phone: '5512345678'
    };

    console.log('Enviando datos:', JSON.stringify(rsvpData, null, 2));
    console.log('URL:', `${BASE_URL}/rsvp`);

    const response = await axios.post(`${BASE_URL}/rsvp`, rsvpData);
    console.log('✅ Confirmación exitosa:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('\n');

    // Test 2: Verificar si el número está registrado
    console.log('2️⃣ Verificando registro del número...');
    const checkResponse = await axios.get(`${BASE_URL}/rsvp/check/5512345678`);
    console.log('✅ Verificación exitosa:');
    console.log(JSON.stringify(checkResponse.data, null, 2));
    console.log('\n');

    // Test 3: Intentar registrar el mismo número (debe fallar)
    console.log('3️⃣ Intentando registrar el mismo número (debe fallar)...');
    try {
      const duplicateResponse = await axios.post(`${BASE_URL}/rsvp`, rsvpData);
      console.log('❌ No debería llegar aquí');
    } catch (error) {
      console.log('✅ Error esperado (número duplicado):');
      console.log(JSON.stringify(error.response.data, null, 2));
    }
    console.log('\n');

    // Test 4: Probar con datos inválidos
    console.log('4️⃣ Probando con datos inválidos...');
    try {
      const invalidData = {
        name: 'A', // Nombre muy corto
        phone: '123' // Teléfono muy corto
      };
      const invalidResponse = await axios.post(`${BASE_URL}/rsvp`, invalidData);
      console.log('❌ No debería llegar aquí');
    } catch (error) {
      console.log('✅ Error esperado (datos inválidos):');
      console.log(JSON.stringify(error.response.data, null, 2));
    }

  } catch (error) {
    console.error('❌ Error en las pruebas:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Respuesta del servidor:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor');
      console.error('Verifica que el servidor esté corriendo en http://localhost:3000');
    } else {
      console.error('Error de configuración:', error.message);
    }
  }
}

// Ejecutar las pruebas
testSimpleRSVP(); 