# 🚀 Backend de Invitaciones - Railway Deployment

## 📋 Información del Proyecto

Este es el backend simplificado para la aplicación de invitaciones de fiestas. El sistema permite confirmar asistencia automáticamente con solo nombre y número de teléfono.

## 🔧 Configuración para Railway

### Variables de Entorno Requeridas

En Railway, configura las siguientes variables de entorno:

- `NODE_ENV`: `production`
- `PORT`: `3000` (Railway lo asigna automáticamente)
- `DATABASE_URL`: URL de PostgreSQL (Railway lo proporciona automáticamente)

### Comandos de Despliegue

Railway detectará automáticamente que es un proyecto Node.js y ejecutará:

```bash
npm install
npm start
```

## 📊 Base de Datos

El proyecto usa:
- **Local**: SQLite
- **Railway**: PostgreSQL (automático)

## 🎯 Endpoints Principales

### Confirmar Asistencia
```http
POST /api/rsvp
Content-Type: application/json

{
  "name": "Juan Pérez",
  "phone": "5512345678"
}
```

### Verificar Registro
```http
GET /api/rsvp/check/{phone}
```

## 🚀 Despliegue

1. Conecta tu repositorio de GitHub a Railway
2. Railway detectará automáticamente la configuración
3. Las variables de entorno se configuran automáticamente
4. El despliegue se ejecuta automáticamente

## 📱 URL de Producción

Una vez desplegado, Railway te proporcionará una URL como:
```
https://tu-proyecto.railway.app
```

## 🔍 Monitoreo

Railway proporciona:
- Logs en tiempo real
- Métricas de rendimiento
- Monitoreo de errores
- Escalado automático

## 🛠️ Desarrollo Local

Para desarrollo local:

```bash
npm install
npm run dev
```

El servidor se ejecutará en `http://localhost:3000` 