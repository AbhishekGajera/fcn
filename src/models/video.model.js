const mongoose = require('mongoose');
const { toJSON , paginate} = require('./plugins');

// product

const videoSchema = new mongoose.Schema({
  title : { type: String, required: true },
  type : { type: String, required: true },
  description : { type : String, required : false },
  url : { type : String, required : false },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
    autopopulate : true
  } 
}
,
  {
    timestamps: true,
  });

// add plugin that converts mongoose to json
videoSchema.plugin(toJSON);
videoSchema.plugin(require('mongoose-autopopulate'));
videoSchema.plugin(paginate);

/**
 * @typedef Video
 */
const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
