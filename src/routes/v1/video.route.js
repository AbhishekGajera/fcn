const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const videoValidation = require('../../validations/video.validation');



const videoController = require('../../controllers/video.controller');
const formidable = require('express-formidable');
var multer = require('multer');


const router = express.Router();
router.use(formidable());

const upload = multer({ dest: 'images/' });



router
  .route('/')
  .post(auth(),upload.single('image'), videoController.videoApprove)
  .get( videoController.getVideo);

  router
.route('/update-video')
.patch( videoController.videoUpdate)



  router
  .route('/:videoId')
  .get(auth(),validate(videoValidation.deleteVideo), videoController.deleteVideo)

module.exports = router;
