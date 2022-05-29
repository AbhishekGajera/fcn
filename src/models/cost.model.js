const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

// cost

const costSchema = new mongoose.Schema({
  totalCost: { type: String, required: true },
  category : { type: String, required: true },
  description : { type : String, required : false },
  image : { type : String, required : false },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate : true
  } 
});

// add plugin that converts mongoose to json
costSchema.plugin(toJSON);

/**
 * @typedef Cost
 */
const Cost = mongoose.model("Cost", costSchema);

module.exports = Cost;