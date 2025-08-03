# Documentación de la API - Backend de Invitaciones

## Información General

- **Base URL**: `http://localhost:3000`
- **API Version**: 1.0.0
- **Content-Type**: `application/json`

## Autenticación

Actualmente la API no requiere autenticación, pero está preparada para implementar JWT en el futuro.

## Respuestas Estándar

### Respuesta Exitosa
```json
{
  "success": true,
  "data": { ... },
  "message": "Mensaje opcional"
}
```

### Respuesta de Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": [
    {
      "field": "campo",
      "message": "Error específico"
    }
  ]
}
```

## Endpoints

### 1. Eventos

#### GET `/api/events/:id`
Obtiene los detalles de un evento específico con estadísticas de invitados.

**Parámetros:**
- `id` (path): ID del evento (número entero)

**Respuesta Exitosa (200):**
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
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "stats": {
      "confirmed": 5,
      "pending": 2,
      "declined": 1,
      "total": 8
    }
  }
}
```

**Errores:**
- `404`: Evento no encontrado
- `400`: ID inválido

#### GET `/api/events/:id/countdown`
Obtiene el tiempo restante para el evento.

**Parámetros:**
- `id` (path): ID del evento (número entero)

**Respuesta Exitosa (200):**
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

**Estados del countdown:**
- `counting_down`: El evento está por venir
- `event_passed`: El evento ya pasó

#### GET `/api/events/:id/guests`
Obtiene la lista de invitados confirmados para un evento.

**Parámetros:**
- `id` (path): ID del evento (número entero)

**Respuesta Exitosa (200):**
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
        "responseDate": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

### 2. RSVP

#### POST `/api/rsvp`
Confirma automáticamente la asistencia al evento activo.

**Body:**
```json
{
  "name": "María González",
  "phone": "5512345678"
}
```

**Validaciones:**
- `name`: 2-50 caracteres, solo letras, espacios y caracteres especiales (áéíóúñ)
- `phone`: Exactamente 10 dígitos, solo números

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Confirmación registrada exitosamente",
  "data": {
    "rsvpId": 1,
    "userId": 1,
    "eventId": 1,
    "eventTitle": "¡ESTÁS INVITADO!",
    "status": "confirmed",
    "responseDate": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errores:**
- `400`: Datos inválidos o teléfono duplicado
- `404`: No hay eventos activos disponibles

#### GET `/api/rsvp/check/:phone`
Verifica si un número de teléfono ya está registrado.

**Parámetros:**
- `phone` (path): Número de teléfono (10 dígitos)

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": {
    "isRegistered": true,
    "user": {
      "id": 1,
      "name": "María González",
      "phone": "5512345678"
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

**Respuesta cuando no está registrado:**
```json
{
  "success": true,
  "data": {
    "isRegistered": false,
    "message": "Número no registrado"
  }
}
```

**Errores:**
- `400`: Formato de teléfono inválido

## Códigos de Estado HTTP

- `200`: OK - Solicitud exitosa
- `201`: Created - Recurso creado exitosamente
- `400`: Bad Request - Datos inválidos
- `404`: Not Found - Recurso no encontrado
- `429`: Too Many Requests - Rate limit excedido
- `500`: Internal Server Error - Error interno del servidor

## Rate Limiting

- **Límite**: 100 requests por 15 minutos
- **Headers de respuesta**:
  - `X-RateLimit-Limit`: Límite de requests
  - `X-RateLimit-Remaining`: Requests restantes
  - `X-RateLimit-Reset`: Tiempo de reset

## Ejemplos de Uso

### JavaScript (Fetch API)
```javascript
// Obtener evento
const response = await fetch('/api/events/1');
const event = await response.json();

// Crear RSVP
const rsvpResponse = await fetch('/api/rsvp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Juan Pérez',
    phone: '5512345678',
    email: 'juan@example.com',
    eventId: 1
  })
});
const rsvp = await rsvpResponse.json();
```

### cURL
```bash
# Obtener evento
curl -X GET http://localhost:3000/api/events/1

# Crear RSVP
curl -X POST http://localhost:3000/api/rsvp \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "phone": "5512345678",
    "email": "juan@example.com",
    "eventId": 1
  }'

# Verificar teléfono
curl -X GET http://localhost:3000/api/rsvp/check/5512345678
```

## Notas Importantes

1. **Validaciones**: Todos los inputs son validados tanto en el frontend como en el backend
2. **Unicidad**: Un teléfono solo puede registrarse una vez por evento
3. **Eventos Activos**: Solo se pueden crear RSVPs para eventos activos
4. **Caracteres Especiales**: Los nombres aceptan caracteres especiales españoles (áéíóúñ)
5. **Timezone**: Todas las fechas se manejan en UTC 