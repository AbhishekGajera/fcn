const express = require('express');
const validate = require('../../middlewares/validate');
const notificationValidation = require('../../validations/notification.validation');
const DashnotificationController = require('../../controllers/dashnotify.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
.route('/add-dash-notification')
.post(auth(),DashnotificationController.DashnotificationAdd)

router
.route('/fetch-dash-notification')
.get(auth(),DashnotificationController.DashgetNotifications)

router
.route('/fetch-recent-notification')
.get(auth(),DashnotificationController.DashgetRecentNotifications)

router
.route('/add-dash-view-notification')
.post(auth(),DashnotificationController.Dashaddview)

router
.route('/get-dash-notification-user/:Transid')
.get(DashnotificationController.DashgetNotificationsByUser)

router
.route('/get-dash-notification-branch')
.get(DashnotificationController.DashgetNotificationsByBranch)

router
.route('/update-dash-notification')
.patch(DashnotificationController.DashnotificationUpdate)

router
.route('/delete-dash-notification/:notificationId')
.get(auth(),validate(notificationValidation.deleteNotifications), DashnotificationController.DashnotificationDelete)

// router
// .route('/delete-target/:targetId')
// .get(auth(),targetController.targetDelete)

module.exports = router;
