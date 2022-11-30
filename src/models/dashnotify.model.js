const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

//target

const dashnotifySchema = new mongoose.Schema({
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
  targetUser : {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: false,
    autopopulate: false,
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
dashnotifySchema.plugin(toJSON);
dashnotifySchema.plugin(paginate);
dashnotifySchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Target
 */
const Dashnotify = mongoose.model('DashNotification', dashnotifySchema);

module.exports = Dashnotify;
