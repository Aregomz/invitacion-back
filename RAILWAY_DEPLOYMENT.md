# 🚀 Despliegue en Railway - Guía Completa

## 📋 Prerrequisitos

1. **Cuenta en Railway**: [railway.app](https://railway.app)
2. **Repositorio en GitHub** con el código del backend
3. **Node.js 18+** (Railway lo detecta automáticamente)

## 🔧 Pasos para Desplegar

### **Paso 1: Preparar el Repositorio**

Asegúrate de que tu repositorio contenga todos los archivos necesarios:

```
invitationBack/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── package.json
├── railway.json
├── railway.config.js
├── railway-setup.js
└── README_RAILWAY.md
```

### **Paso 2: Conectar a Railway**

1. **Ve a [Railway.app](https://railway.app)**
2. **Inicia sesión con GitHub**
3. **Crea un nuevo proyecto**
4. **Selecciona "Deploy from GitHub repo"**
5. **Selecciona tu repositorio**

### **Paso 3: Configurar Variables de Entorno**

En Railway, en la pestaña "Variables", agrega:

```
NODE_ENV=production
```

### **Paso 4: Agregar Base de Datos PostgreSQL**

**⚠️ IMPORTANTE: Este paso es CRÍTICO**

1. En Railway, ve a la pestaña **"Data"**
2. Haz clic en **"New"**
3. Selecciona **"Database"** → **"PostgreSQL"**
4. Railway configurará automáticamente `DATABASE_URL`

### **Paso 5: Verificar el Despliegue**

Una vez desplegado, Railway te dará una URL como:
```
https://tu-proyecto.railway.app
```

### **Paso 6: Probar el Despliegue**

Puedes probar el endpoint de salud:
```
GET https://tu-proyecto.railway.app/health
```

## 🔍 Solución de Problemas

### **Error: DATABASE_URL undefined**

**Síntomas:**
```
TypeError [ERR_INVALID_ARG_TYPE]: The "url" argument must be of type string. Received undefined
```

**Solución:**
1. Ve a Railway → Tu proyecto → Pestaña "Data"
2. Crea una nueva base de datos PostgreSQL
3. Railway configurará automáticamente `DATABASE_URL`
4. Redespliega el proyecto

### **Error: Puerto en uso**

**Síntomas:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solución:**
- Railway asigna automáticamente el puerto, no necesitas configurar nada

### **Error: Dependencias faltantes**

**Síntomas:**
```
Cannot find module 'pg'
```

**Solución:**
- Las dependencias se instalan automáticamente con `npm install`
- Verifica que `pg` y `pg-hstore` estén en `package.json`

## 📱 Información para el Frontend

Una vez desplegado correctamente, la información para el frontend será:

### **URL Base**
```
https://tu-proyecto.railway.app
```

### **Endpoints Disponibles**

```javascript
// Confirmar asistencia
POST https://tu-proyecto.railway.app/api/rsvp
Content-Type: application/json

{
  "name": "Juan Pérez",
  "phone": "5512345678"
}

// Verificar registro
GET https://tu-proyecto.railway.app/api/rsvp/check/5512345678

// Verificar salud del servidor
GET https://tu-proyecto.railway.app/health
```

### **Ejemplo de Uso en Frontend**

```javascript
const API_URL = 'https://tu-proyecto.railway.app/api';

// Confirmar asistencia
async function confirmarAsistencia(nombre, telefono) {
  try {
    const response = await fetch(`${API_URL}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nombre, phone: telefono })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Verificar si está registrado
async function verificarRegistro(telefono) {
  try {
    const response = await fetch(`${API_URL}/rsvp/check/${telefono}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

## 🔍 Monitoreo

Railway proporciona:
- **Logs en tiempo real** en la pestaña "Deployments"
- **Métricas de rendimiento** en la pestaña "Metrics"
- **Variables de entorno** en la pestaña "Variables"
- **Base de datos** en la pestaña "Data"

## 🛠️ Comandos Útiles

```bash
# Verificar configuración local
npm run railway:check

# Inicializar base de datos local
npm run railway:init

# Probar despliegue (reemplazar URL)
node test-railway.js
```

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Railway
2. Verifica que `DATABASE_URL` esté configurado
3. Asegúrate de que `NODE_ENV=production`
4. Verifica que PostgreSQL esté creado en Railway 