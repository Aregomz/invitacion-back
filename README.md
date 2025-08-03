# Backend de Invitaciones de Fiestas

Un backend completo en Node.js con Express y Sequelize para gestionar invitaciones de fiestas y confirmaciones de asistencia.

## 🚀 Características

- **Gestión de Eventos**: Crear y gestionar eventos con fechas, ubicaciones y descripciones
- **Sistema de RSVP**: Confirmar asistencia con validaciones robustas
- **Validaciones Avanzadas**: Nombre, teléfono y email con reglas específicas
- **Countdown Timer**: Tiempo restante para cada evento
- **Rate Limiting**: Protección contra spam y ataques
- **Logging**: Registro completo de operaciones
- **Manejo de Errores**: Sistema centralizado de errores
- **Base de Datos**: SQLite para desarrollo, PostgreSQL para producción

## 📋 Requisitos

- Node.js 16+
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd invitationBack
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de configuración
cp config.env.example config.env
# Editar config.env con tus configuraciones
```

4. **Inicializar la base de datos**
```bash
# Crear tablas y datos de ejemplo
npm run db:reset
```

5. **Iniciar el servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 🗄️ Estructura de la Base de Datos

### Users/Guests
- `id` (INTEGER, PRIMARY KEY)
- `name` (STRING, 2-50 caracteres, solo letras y espacios)
- `phone` (STRING, 10 dígitos, único)
- `email` (STRING, opcional, formato válido)
- `createdAt` (DATE)
- `updatedAt` (DATE)

### Events
- `id` (INTEGER, PRIMARY KEY)
- `title` (STRING, 100 caracteres)
- `date` (DATEONLY)
- `time` (TIME)
- `location` (STRING, 200 caracteres)
- `description` (TEXT, opcional)
- `targetDate` (DATE)
- `isActive` (BOOLEAN, default: true)
- `createdAt` (DATE)
- `updatedAt` (DATE)

### RSVPs
- `id` (INTEGER, PRIMARY KEY)
- `userId` (INTEGER, FOREIGN KEY)
- `eventId` (INTEGER, FOREIGN KEY)
- `status` (ENUM: 'confirmed', 'pending', 'declined')
- `responseDate` (DATE)
- `createdAt` (DATE)
- `updatedAt` (DATE)

## 🔌 Endpoints de la API

### Eventos

#### GET `/api/events/:id`
Obtener detalles de un evento específico con estadísticas de invitados.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "¡ESTÁS INVITADO!",
    "date": "2025-08-08",
    "time": "19:00:00",
    "location": "Avenida Alta Luz 2001",
    "description": "",
    "targetDate": "2025-08-08T19:00:00.000Z",
    "isActive": true,
    "stats": {
      "confirmed": 5,
      "pending": 2,
      "declined": 1,
      "total": 8
    }
  }
}
```

#### GET `/api/events/:id/countdown`
Obtener tiempo restante para el evento.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "eventId": 1,
    "eventTitle": "¡ESTÁS INVITADO!",
    "countdown": {
      "days": 45,
      "hours": 12,
      "minutes": 30,
      "seconds": 15,
      "status": "counting_down"
    }
  }
}
```

#### GET `/api/events/:id/guests`
Obtener lista de invitados confirmados (para admin).

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "eventId": 1,
    "eventTitle": "¡ESTÁS INVITADO!",
    "guests": [
      {
        "id": 1,
        "name": "Juan Pérez",
        "phone": "5512345678",
        "email": "juan@example.com",
        "responseDate": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

### RSVP

#### POST `/api/rsvp`
Confirmar asistencia con validaciones.

**Body:**
```json
{
  "name": "María González",
  "phone": "5512345678",
  "email": "maria@example.com",
  "eventId": 1
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Confirmación registrada exitosamente",
  "data": {
    "rsvpId": 1,
    "userId": 1,
    "eventId": 1,
    "status": "confirmed",
    "responseDate": "2024-01-15T10:30:00.000Z"
  }
}
```

#### GET `/api/rsvp/check/:phone`
Verificar si un número ya está registrado.

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "isRegistered": true,
    "user": {
      "id": 1,
      "name": "María González",
      "phone": "5512345678",
      "email": "maria@example.com"
    },
    "events": [
      {
        "eventId": 1,
        "eventTitle": "¡ESTÁS INVITADO!",
        "eventDate": "2025-08-08",
        "eventTime": "19:00:00",
        "eventLocation": "Avenida Alta Luz 2001",
        "status": "confirmed",
        "responseDate": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

## ✅ Validaciones

### Nombre
- Solo letras, espacios y caracteres especiales (áéíóúñ)
- Mínimo 2, máximo 50 caracteres
- No permite números

### Teléfono
- Exactamente 10 dígitos
- Solo números
- Único por evento

### Email
- Formato válido de email
- Opcional

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción
npm start

# Base de datos
npm run db:migrate    # Ejecutar migraciones
npm run db:seed       # Ejecutar seeders
npm run db:reset      # Resetear base de datos completa
```

## 🛡️ Seguridad

- **Helmet**: Headers de seguridad
- **CORS**: Configuración de origen cruzado
- **Rate Limiting**: Protección contra spam
- **Validación**: Express-validator para inputs
- **Logging**: Morgan para logs de acceso

## 📝 Logging

El sistema registra:
- Todas las peticiones HTTP
- Errores de validación
- Errores de base de datos
- Operaciones de RSVP

## 🚀 Despliegue

### Variables de Entorno para Producción

```env
NODE_ENV=production
PORT=3000
DB_DIALECT=postgres
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
DB_HOST=your_host
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=error
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Datos de Ejemplo

El sistema incluye un evento de ejemplo:
- **Título**: "¡ESTÁS INVITADO!"
- **Fecha**: 8 de Agosto 2025
- **Hora**: 7:00 PM
- **Ubicación**: "Avenida Alta Luz 2001"
- **TargetDate**: 2025-08-08T19:00:00Z

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 📞 Soporte

Para soporte técnico, contacta a [tu-email@example.com] 