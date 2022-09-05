const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {  addVideo,
    updateVideoById,
    deleteVideoById,
    getVideoList } = require('../services/video.service');
const pick = require('../utils/pick');
const formidable = require('formidable');
const path = require('path')
const fs = require('fs');
const uploadToCloudinary = require('../utils/uploadToCloudnary');

const videoApprove = catchAsync(async (req, res) => {
  const form = formidable.IncomingForm();
  const uploadFolder = path.join(__dirname, '../../files');

  form.multiples = true;
  form.maxFileSize = 300 * 1024 * 1024; // 5MB
  form.uploadDir = uploadFolder;
  console.info(req?.file)
  console.info(req?.files)

  // Check if multiple files or a single file
  if (!req?.files?.length) {
    //Single file

    const file = req?.files?.image;

    // creates a valid name by removing spaces
    const fileName = encodeURIComponent(file?.name?.replace(/\s/g, '-'));

    try {
      // renames the file in the directory
      fs.renameSync((file?.path || ''), (uploadFolder + '/' + fileName));
      const result = await uploadToCloudinary(uploadFolder + '/' + fileName,'products')
      req.fields.image = result.url
    } catch (error) {
      console.error(error)
    }
  }

  const result = await addVideo(req.fields);
  res.status(httpStatus.CREATED).send(result);
});

const getVideo = catchAsync(async (req, res) => {
  
  const filter = pick(req.query, ['name','status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getVideoList(filter, options);
  res.send(result);
});

const deleteVideo = catchAsync(async (req, res) => {
  try {
    await deleteVideoById(req.params.videoId);
    return res.status(httpStatus.CREATED).send({ success : true });
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({ success : false });
  }
});

const videoUpdate = catchAsync(async (req, res) => {
  const result = await updateVideoById(req.fields.videoId,req.fields);
  res.send(result);
});

module.exports = {
  videoApprove,
  getVideo,
  deleteVideo,
  videoUpdate
};
