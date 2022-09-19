const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

//target

const notificationSeenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
  notificationId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Notification',
    required: true,
    autopopulate: true,
  }
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
notificationSeenSchema.plugin(toJSON);
notificationSeenSchema.plugin(paginate);
notificationSeenSchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Target
 */
const NotificationSeen = mongoose.model('NotificationSeen', notificationSeenSchema);

module.exports = NotificationSeen;
