const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const employeeRoute = require('./employee.route');
const costRoute = require('./cost.route');
const productRoute = require('./product.route');
const docsRoute = require('./docs.route');
const targetRoute = require('./target.route');
const contactRoute = require('./contact.route');
const revenueRoute = require('./revenues.route');


const appoinmentsRoute = require('./appoiments.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/employee',
    route: employeeRoute,
  },
  {
    path: '/cost',
    route: costRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/revenue',
    route: revenueRoute,
  },
  {
    path: '/target',
    route: targetRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
  {
    path: '/appoinments',
    route: appoinmentsRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env !== 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
