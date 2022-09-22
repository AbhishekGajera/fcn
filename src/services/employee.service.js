const httpStatus = require('http-status');
const Salary = require('../models/salary.model');
const Leave = require('../models/leave.model');
const Emp = require('../models/employee.model');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service')
/**
 * Create a leave
 * @param {Object} leaveBody
 * @returns {Promise<User>}
 */
const approveLeave = async (leaveBody) => {
  return Leave.create(leaveBody);
};


/**
 * Get leave by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getLeaveById = async (id) => {
  return Leave.findById(id);
};


/**
 * Update leave by id
 * @param {ObjectId} leaveId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
 const updateLeaveById = async (leaveId, updateBody) => {
  const leave = await getLeaveById(leaveId);
  if (!leave) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Leave not found');
  }

  if(updateBody?.user){
    const user = await getUserById(updateBody?.user)
    if(!user){
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
  }

  Object.assign(leave, updateBody);
  await leave.save();
  return leave;
};



/**
 * Delete leave by id
 * @param {ObjectId} leaveId
 * @returns {Promise<Employee>}
 */
 const deleteLeaveById = async (leaveId) => {
  const leave = await getLeaveById(leaveId);
  if (!leave) {
    throw new ApiError(httpStatus.NOT_FOUND, 'leave not found');
  }
  await leave.remove();
  return leave;
};


/**
 * Get leaves
 * @returns {Promise<Employee>}
 */
 const getLeavesList = async (filter,options) => {
 const leave = await Leave.paginate(filter, options);
 if (!leave) {
   throw new ApiError(httpStatus.NOT_FOUND, 'leave not found');
 }
 return leave;
};

/**
 * Get emp by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
 const getEmpById = async (id) => {
  return Emp.findById(id);
};


/**
 * Create a emplloyee
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createEmployee = async (userBody) => {
  if (await Emp.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  userBody.name = (userBody?.first_name || '') + ' ' + (userBody?.last_name ||  ' ')
  return Emp.create(userBody);
}

/**
 * Get employee
 * @returns {Promise<Employee>}
 */
 const getEmployeeList = async (filter,options) => {
  const emp = await Emp.paginate(filter, options);
  if (!emp) {
    throw new ApiError(httpStatus.NOT_FOUND, 'emp not found');
  }
  return emp;
 };

 /**
 * Update emp by id
 * @param {ObjectId} empId
 * @param {Object} updateBody
 * @returns {Promise<Emp>}
 */
const updateEmployeeById = async (empId, updateBody) => {
  const emp = await getEmpById(empId);
  if (!emp) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Emp not found');
  }
  if (updateBody.email && (await Emp.isEmailTaken(updateBody.email, empId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  if(updateBody?.first_name || updateBody?.last_name){
    updateBody.name = (updateBody?.first_name || emp?.first_name) + ' ' + (updateBody?.last_name ||  emp?.last_name)
  }

  Object.assign(emp, updateBody);
  await emp.save();

  if (updateBody.hasOwnProperty('password')) {
    await sendNewPasswordEmail(emp.email, emp.email, updateBody.password)
  }
  return emp;
};

/**
 * Delete emp by id
 * @param {ObjectId} empId
 * @returns {Promise<Employee>}
 */
 const deleteEmpById = async (empId) => {
  const emp = await getEmpById(empId);
  if (!emp) {
    throw new ApiError(httpStatus.NOT_FOUND, 'emp not found');
  }
  await emp.remove();
  return emp;
};



module.exports = {
  approveLeave,
  updateLeaveById,
  deleteLeaveById,
  getLeavesList,
  createEmployee,
  getEmployeeList,
  updateEmployeeById,
  deleteEmpById
};
