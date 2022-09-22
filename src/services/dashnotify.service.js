const httpStatus = require('http-status');
const Dashnotifys = require('../models/dashnotify.model');
const SeenNotifications = require('../models/notificationSeen.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')

/**
 * Create a target
 * @param {Object} leaveBody
 * @returns {Promise<Notifications>}
 */
const addDashNotifications = async (leaveBody) => {
  return Dashnotifys.create(leaveBody);
};


/**
 * Create a view on notification
 * @param {Object} leaveBody
 * @returns {Promise<Notifications>}
 */
 const addViewDashNotifications = async (leaveBody) => {
  return SeenNotifications.create(leaveBody);
};


/**
 * Get target by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getDashNotificationsById = async (id) => {
  return Dashnotifys.findById(id);
};


/**
 * Update target by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateDashNotificationsById = async (leaveId, updateBody) => {
  const notification = await getDashNotificationsById(leaveId);
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
const deleteDashNotificationsById = async (notificationId) => {
  const notificationdata = await getDashNotificationsById(notificationId);
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
const getDashNotificationsList = async (filter, options, userId) => {
  const notification = await Dashnotifys.paginate(filter, options);
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

const getDashRecentNotificationsList = async () => {
  const notification = await Dashnotifys.find({}).sort({$natural:-1}).limit(1);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'notification not found');
  }

  // for (let index = 0; index < notification?.results?.length; index++) {
  //   const element = notification?.results?.[index];
  //   const checkStatus = await SeenNotifications.findOne({ userId , notificationId : element._id  })

  //   if(checkStatus){
  //     element.hasShowen = true
  //   }
    
  // }

  return notification;
};

const getDashNotificationsUser = async (id) => {
  const notification = await Dashnotifys.find({
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

const getDashNotificationsBranch = async (filter, options) => {

  const notification = await Dashnotifys.paginate(filter, options);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'notification not found');
  }
  return notification;
};


module.exports = {
  addDashNotifications,
  updateDashNotificationsById,
  deleteDashNotificationsById,
  getDashNotificationsList,
  getDashRecentNotificationsList,
  getDashNotificationsUser,
  getDashNotificationsBranch,
  addViewDashNotifications
};
