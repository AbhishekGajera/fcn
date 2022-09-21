const mongoose = require('mongoose');
const { toJSON,paginate } = require('./plugins');

//travelQuery

const travelQuerySchema = new mongoose.Schema({
  source: {
    type: String,
    required : true
  },
  destination : {
    type : String,
    required : true
  },
  start_date : {
    type : String,
    required : true
  },
  end_date : {
    type : String,
    required : true
  },
  type : {
    type : String,
    required : true
  },
  status : {
    type : Number,
    enum : [0,1,2], // 0 is pending, 1 is approved, 2 is declined
    default : 0
  }
},
{
  timestamps : true
});

// add plugin that converts mongoose to json
travelQuerySchema.plugin(toJSON);
travelQuerySchema.plugin(paginate);
travelQuerySchema.plugin(require('mongoose-autopopulate'));


/**
 * @typedef TravelQuery
 */
const TravelQuery = mongoose.model('TravelQuery', travelQuerySchema);

module.exports = TravelQuery;
