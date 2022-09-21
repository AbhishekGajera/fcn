const httpStatus = require('http-status');
const Notifications = require('../models/notification.model');
const SeenNotifications = require('../models/notificationSeen.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a target
 * @param {Object} leaveBody
 * @returns {Promise<Notifications>}
 */
const addNotifications = async (leaveBody) => {
  return Notifications.create(leaveBody);
};


/**
 * Create a view on notification
 * @param {Object} leaveBody
 * @returns {Promise<Notifications>}
 */
 const addViewNotifications = async (leaveBody) => {
  return SeenNotifications.create(leaveBody);
};


/**
 * Get target by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getNotificationsById = async (id) => {
  return Notifications.findById(id);
};


/**
 * Update target by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateNotificationsById = async (leaveId, updateBody) => {
  const notification = await getNotificationsById(leaveId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notifications not found');
  }

  if (updateBody?.user) {
    const user = await getUserById(updateBody?.user)
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(notification, updateBody);
  await notification.save();
  return notification;
};



/**
 * Delete target by id
 * @param {ObjectId} notificationId
 * @returns {Promise<Employee>}
 */
const deleteNotificationsById = async (notificationId) => {
  const notificationdata = await getNotificationsById(notificationId);
  if (!notificationdata) {
    throw new ApiError(httpStatus.NOT_FOUND, 'notification not found');
  }
  await notificationdata.remove();
  return notificationdata;
};


/**
 * Get targets
 * @returns {Promise<Employee>}
 */
const getNotificationsList = async (filter, options, userId) => {
  const notification = await Notifications.paginate(filter, options);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'notification not found');
  }

  for (let index = 0; index < notification?.results?.length; index++) {
    const element = notification?.results?.[index];
    const checkStatus = await SeenNotifications.findOne({ userId , notificationId : element._id  })

    if(checkStatus){
      element.hasShowen = true
    }
    
  }

  return notification;
};


const getNotificationsUser = async (id) => {
  const notification = await Notifications.find({
    $or: [
      {
        from_user: id,
      },
      {
        to_user: id,
      }
    ],
    status: 0
  });
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'notification not found');
  }
  return notification;
};

const getNotificationsBranch = async (filter, options) => {

  const notification = await Notifications.paginate(filter, options);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'notification not found');
  }
  return notification;
};


module.exports = {
  addNotifications,
  updateNotificationsById,
  deleteNotificationsById,
  getNotificationsList,
  getNotificationsUser,
  getNotificationsBranch,
  addViewNotifications,
  getNotificationsById
};
