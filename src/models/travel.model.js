const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

//travel

const travelSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true
  },
  desc : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  image : {
    type : String,
    required : true,
    default : 'https://placeimg.com/400/225/nature'
  },
  type : {
    type : String,
    required : true
  }
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
travelSchema.plugin(toJSON);
travelSchema.plugin(paginate);
travelSchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef Travel
 */
const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
