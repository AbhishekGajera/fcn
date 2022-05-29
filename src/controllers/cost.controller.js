const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { approveCost } = require('../services/cost.service');
const pick = require('../utils/pick');
const formidable = require('formidable');
const path = require('path')
const fs = require('fs');
const uploadToCloudinary = require('../utils/uploadToCloudnary');

const costApprove = catchAsync(async (req, res) => {
  const form = formidable.IncomingForm();
  const uploadFolder = path.join(__dirname, '../../files');

  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.uploadDir = uploadFolder;

  // Check if multiple files or a single file
  if (!req?.files?.length) {
    //Single file

    const file = req?.files?.image;

    // creates a valid name by removing spaces
    const fileName = encodeURIComponent(file?.name?.replace(/\s/g, '-'));

    try {
      // renames the file in the directory
      fs.renameSync((file?.path || ''), (uploadFolder + '/' + fileName));
      const result = await uploadToCloudinary(uploadFolder + '/' + fileName)
      req.fields.image = result.url
    } catch (error) {
      console.log(error);
    }
  }

  const result = await approveCost(req.fields);
  res.status(httpStatus.CREATED).send(result);
});

module.exports = {
  costApprove,
};