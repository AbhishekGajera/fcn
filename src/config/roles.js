const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
  IBO: ['getUsers', 'manageUsers'],
  branch: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
