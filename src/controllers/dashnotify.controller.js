const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {   addDashNotifications,
    updateDashNotificationsById,
    deleteDashNotificationsById,
    getDashNotificationsList,
    getDashRecentNotificationsList,
    getDashNotificationsUser,
    getDashNotificationsBranch,
    addViewDashNotifications } = require('../services/dashnotify.service');
const pick = require('../utils/pick');


const DashnotificationAdd = catchAsync(async (req, res) => {
  const result = await addDashNotifications(req.body);
  res.status(httpStatus.CREATED).send(result);
});

const DashnotificationUpdate = catchAsync(async (req, res) => {
  const result = await updateDashNotificationsById(req.body.trasaction_id,req.body);
  res.send(result);
});

const DashnotificationDelete = catchAsync(async (req, res) => {
  await deleteDashNotificationsById(req.params.notificationId);
  res.status(httpStatus.NO_CONTENT).send();
});

const DashgetNotifications = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'targetAudience','user','status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getDashNotificationsList(filter, options,req?.user._id);
  res.send(result);
});

const DashgetRecentNotifications = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['title', 'targetAudience','user','status']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getDashRecentNotificationsList();
  res.send(result);
});

const Dashaddview = catchAsync(async (req, res) => {
  const result = await addViewDashNotifications(req.body);
  res.send(result);
});

const DashgetNotificationsByUser = catchAsync(async (req, res) => {
  const result = await getDashNotificationsUser(req.params.Transid);
  res.send({ results : result  });
});

const DashgetNotificationsByBranch = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['role','to_user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await getDashNotificationsBranch(filter,options);
  res.send(result);
});

module.exports = {
  DashnotificationAdd,
  DashnotificationUpdate,
  DashnotificationDelete,
  DashgetRecentNotifications,
  DashgetNotifications,
  DashgetNotificationsByUser,
  DashgetNotificationsByBranch,
  Dashaddview
};
