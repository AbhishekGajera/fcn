const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addVideo = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    type: Joi.string().required(),
    description: Joi.string(),
    
    url: Joi.allow(),
    title: Joi.string().required()
  }),
};

const deleteVideo = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addVideo,
  deleteVideo
};
