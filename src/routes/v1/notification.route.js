const express = require('express');
const validate = require('../../middlewares/validate');
const notificationValidation = require('../../validations/notification.validation');
const notificationController = require('../../controllers/notification.controller');
const auth = require('../../middlewares/auth');


const router = express.Router();



router
.route('/add-notification')
.post(auth(),notificationController.notificationAdd)

router
.route('/fetch-notification')
.get(auth(),notificationController.getNotifications)

router
.route('/add-view-notification')
.post(auth(),notificationController.addview)

router
.route('/get-notification-user/:Transid')
.get(notificationController.getNotificationsByUser)

router
.route('/get-notification-branch')
.get(notificationController.getNotificationsByBranch)

router
.route('/update-notification')
.patch(notificationController.notificationUpdate)

router
.route('/delete-notification/:notificationId')
.get(auth(),validate(notificationValidation.deleteNotifications), notificationController.notificationDelete)

// router
// .route('/delete-target/:targetId')
// .get(auth(),targetController.targetDelete)

module.exports = router;
