const User = require('./User');
const Event = require('./Event');
const RSVP = require('./RSVP');

// Definir relaciones
User.hasMany(RSVP, { foreignKey: 'userId', sourceKey: 'id', as: 'rsvps' });
RSVP.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });

Event.hasMany(RSVP, { foreignKey: 'eventId', sourceKey: 'id', as: 'rsvps' });
RSVP.belongsTo(Event, { foreignKey: 'eventId', targetKey: 'id', as: 'event' });

User.belongsToMany(Event, { through: RSVP, foreignKey: 'userId', otherKey: 'eventId', as: 'events' });
Event.belongsToMany(User, { through: RSVP, foreignKey: 'eventId', otherKey: 'userId', as: 'guests' });

module.exports = {
  User,
  Event,
  RSVP
}; 