const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { approveCost } = require('../services/cost.service');
const pick = require('../utils/pick');
const formidable = require('formidable');
const path = require('path')
const fs = require('fs');


const isFileValid = (file) => {
  const type = file?.type?.split('/').pop();
  const validTypes = ['jpg', 'jpeg', 'png', 'pdf'];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

const costApprove = catchAsync(async (req, res) => {
  const form = formidable.IncomingForm();
  const uploadFolder = path.join(__dirname, '../../files');

  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; // 5MB
  form.uploadDir = uploadFolder;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log('Error parsing the files');
      return res.status(400).json({
        status: 'Fail',
        message: 'There was an error parsing the files',
        error: err,
      });
    }
  });


  // Check if multiple files or a single file
  if (!req?.files?.length) {
    //Single file

    const file = req?.files?.image;

    // creates a valid name by removing spaces
    const fileName = encodeURIComponent(file?.name?.replace(/\s/g, '-'));

    try {
      // renames the file in the directory
      fs.renameSync(file?.path || '', (uploadFolder + '/' + fileName));
      req.fields.image = fileName
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
