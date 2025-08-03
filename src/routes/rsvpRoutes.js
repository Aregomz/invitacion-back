const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');
const { validateRSVP, validatePhone } = require('../middleware/validation');

// POST /api/rsvp - Confirmar asistencia
router.post('/', validateRSVP, rsvpController.createRSVP);

// GET /api/rsvp/check/:phone - Verificar si un número ya está registrado
router.get('/check/:phone', validatePhone, rsvpController.checkPhoneRegistration);

module.exports = router; 