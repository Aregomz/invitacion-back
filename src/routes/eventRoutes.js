const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { validateId } = require('../middleware/validation');

// GET /api/events/:id - Obtener detalles de un evento específico
router.get('/:id', validateId, eventController.getEventById);

// GET /api/events/:id/countdown - Obtener tiempo restante para el evento
router.get('/:id/countdown', validateId, eventController.getEventCountdown);

// GET /api/events/:id/guests - Obtener lista de invitados confirmados
router.get('/:id/guests', validateId, eventController.getEventGuests);

module.exports = router; 