const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

//target

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
  targetAudience: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  attachment : {
    type: String,
    required: false,
  },
  status : {
    type : Number,
    enum : [0,1,2], // 0 is pending, 1 is showen, 2 is declined
    default : 0
  },
  hasShowen : {
    type : Boolean,
    default : false
  }
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);
notificationSchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Target
 */
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
