const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Errores de validación de Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(error => ({
      field: error.path,
      message: error.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors
    });
  }

  // Errores de restricción única de Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(error => ({
      field: error.path,
      message: `${error.path} ya existe`
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Error de duplicación',
      errors
    });
  }

  // Errores de validación de express-validator
  if (err.array) {
    const errors = err.array().map(error => ({
      field: error.path,
      message: error.msg
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors
    });
  }

  // Errores de recursos no encontrados
  if (err.status === 404) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Recurso no encontrado'
    });
  }

  // Error por defecto
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler; 