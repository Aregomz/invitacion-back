const { User, Event, RSVP } = require('../models');
const { Op } = require('sequelize');

// Confirmar asistencia automáticamente
const createRSVP = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    // Buscar el evento activo (asumiendo que solo hay uno activo)
    const activeEvent = await Event.findOne({
      where: { isActive: true }
    });

    if (!activeEvent) {
      return res.status(404).json({
        success: false,
        message: 'No hay eventos activos disponibles'
      });
    }

    // Verificar si el teléfono ya está registrado para este evento
    const existingRSVP = await RSVP.findOne({
      include: [
        {
          model: User,
          as: 'user',
          where: { phone },
          attributes: []
        },
        {
          model: Event,
          as: 'event',
          where: { id: activeEvent.id },
          attributes: []
        }
      ]
    });

    if (existingRSVP) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una confirmación para este teléfono'
      });
    }

    // Crear o encontrar el usuario
    let user = await User.findOne({ where: { phone } });
    
    if (!user) {
      user = await User.create({
        name,
        phone
      });
    } else {
      // Actualizar nombre del usuario si es necesario
      await user.update({
        name
      });
    }

    // Crear el RSVP automáticamente
    const rsvp = await RSVP.create({
      userId: user.id,
      eventId: activeEvent.id,
      status: 'confirmed',
      responseDate: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Confirmación registrada exitosamente',
      data: {
        rsvpId: rsvp.id,
        userId: user.id,
        eventId: activeEvent.id,
        eventTitle: activeEvent.title,
        status: rsvp.status,
        responseDate: rsvp.responseDate
      }
    });
  } catch (error) {
    next(error);
  }
};

// Verificar si un número ya está registrado
const checkPhoneRegistration = async (req, res, next) => {
  try {
    const { phone } = req.params;

    // Buscar usuario por teléfono
    const user = await User.findOne({
      where: { phone },
      include: [
        {
          model: RSVP,
          as: 'rsvps',
          include: [
            {
              model: Event,
              as: 'event',
              attributes: ['id', 'title', 'date', 'time', 'location']
            }
          ]
        }
      ]
    });

    if (!user) {
      return res.json({
        success: true,
        data: {
          isRegistered: false,
          message: 'Número no registrado'
        }
      });
    }

    res.json({
      success: true,
      data: {
        isRegistered: true,
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone
        },
        events: user.rsvps.map(rsvp => ({
          eventId: rsvp.event.id,
          eventTitle: rsvp.event.title,
          eventDate: rsvp.event.date,
          eventTime: rsvp.event.time,
          eventLocation: rsvp.event.location,
          status: rsvp.status,
          responseDate: rsvp.responseDate
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRSVP,
  checkPhoneRegistration
}; 