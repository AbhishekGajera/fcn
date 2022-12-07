const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {  addNotifications,
    updateNotificationsById,
    deleteNotificationsById,
    getNotificationsUser,
    getNotificationsBranch,
    addViewNotifications,
    getNotificationsList,
    getNotificationsById, 
    getPersonalizedeList} = require('../services/notification.service');
const pick = require('../utils/pick');


const notificationAdd = catchAsync(async (req, res) => {
  const result = await addNotifications(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getNotifiById = catchAsync(async (req, res) => {
  const result = await getNotificationsById(req.params.notificationId);
  res.status(httpStatus.CREATED).send(result);
});

const notificationUpdate = catchAsync(async (req, res) => {
  const result = await updateNotificationsById(req.params.trasaction_id,req.body);
  res.send(result);
});

const notificationUpdateById = catchAsync(async (req, res) => {
  const result = await updateNotificationsById(req.params.id,req.body);
  res.send(result);
});

const notificationDelete = catchAsync(async (req, res) => {
  await deleteNotificationsById(req.params.notificationId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getNotifications = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'targetAudience','user','status','is_delete']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getNotificationsList(filter, options,req?.user._id);
  res.send(result);
});

const addview = catchAsync(async (req, res) => {
  const result = await addViewNotifications(req.body);
  res.send(result);
});

const getNotificationsByUser = catchAsync(async (req, res) => {
  const result = await getNotificationsUser(req.params.notificationId);
  res.send({ results : result  });
});

const getNotificationsByBranch = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role','to_user','is_delete']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getNotificationsBranch(filter,options);
  res.send(result);
});

const getPersonalizedNotification = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10

  const result = await getPersonalizedeList(req.params.userId,page, limit);
  res.send({ results : result  });
});

module.exports = {
  notificationAdd,
  notificationUpdate,
  notificationDelete,
  getNotifications,
  getNotificationsByUser,
  getNotificationsByBranch,
  addview,
  getNotifiById,
  getPersonalizedNotification,
  notificationUpdateById
};
