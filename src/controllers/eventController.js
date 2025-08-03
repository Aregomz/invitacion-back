const { Event, User, RSVP } = require('../models');
const moment = require('moment');

// Obtener detalles de un evento específico
const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByPk(id, {
      include: [
        {
          model: User,
          as: 'guests',
          through: { attributes: ['status', 'responseDate'] },
          attributes: ['id', 'name', 'phone', 'email']
        }
      ]
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    // Contar invitados por estado
    const confirmedCount = event.guests.filter(guest => 
      guest.RSVP.status === 'confirmed'
    ).length;
    
    const pendingCount = event.guests.filter(guest => 
      guest.RSVP.status === 'pending'
    ).length;
    
    const declinedCount = event.guests.filter(guest => 
      guest.RSVP.status === 'declined'
    ).length;

    res.json({
      success: true,
      data: {
        ...event.toJSON(),
        stats: {
          confirmed: confirmedCount,
          pending: pendingCount,
          declined: declinedCount,
          total: event.guests.length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Obtener tiempo restante para el evento
const getEventCountdown = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByPk(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    const now = moment();
    const targetDate = moment(event.targetDate);
    const diff = targetDate.diff(now);

    if (diff <= 0) {
      return res.json({
        success: true,
        data: {
          eventId: event.id,
          eventTitle: event.title,
          countdown: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            status: 'event_passed'
          }
        }
      });
    }

    const duration = moment.duration(diff);
    
    res.json({
      success: true,
      data: {
        eventId: event.id,
        eventTitle: event.title,
        countdown: {
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
          status: 'counting_down'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Obtener lista de invitados confirmados
const getEventGuests = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByPk(id, {
      include: [
        {
          model: User,
          as: 'guests',
          through: { attributes: ['status', 'responseDate'] },
          attributes: ['id', 'name', 'phone', 'email'],
          where: {
            '$guests->RSVP.status$': 'confirmed'
          }
        }
      ]
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        eventId: event.id,
        eventTitle: event.title,
        guests: event.guests.map(guest => ({
          id: guest.id,
          name: guest.name,
          phone: guest.phone,
          email: guest.email,
          responseDate: guest.RSVP.responseDate
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEventById,
  getEventCountdown,
  getEventGuests
}; 