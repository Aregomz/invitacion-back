const { body, param, validationResult } = require('express-validator');

// Validación para RSVP simplificada
const validateRSVP = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres')
    .matches(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/)
    .withMessage('El nombre solo puede contener letras, espacios y caracteres especiales (áéíóúñ)'),
  
  body('phone')
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage('El teléfono debe tener exactamente 10 dígitos')
    .matches(/^\d{10}$/)
    .withMessage('El teléfono solo puede contener números'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validación para parámetros de ID
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número válido'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validación para teléfono
const validatePhone = [
  param('phone')
    .isLength({ min: 10, max: 10 })
    .withMessage('El teléfono debe tener exactamente 10 dígitos')
    .matches(/^\d{10}$/)
    .withMessage('El teléfono solo puede contener números'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateRSVP,
  validateId,
  validatePhone
}; 