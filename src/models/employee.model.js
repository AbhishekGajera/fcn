const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const empSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      default: this.first_name + ' ' + this.last_name
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      default : 'Admin@123.Com',
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      default: 'emp',
    },
    contactno: {
      type: Number,
      required: true,
      default: 0000000000,
    },
    dob: {
      type: String,
      required: true,
      default: '01/01/-1'
    },
    avatar: {
      type: String, required: false
    },
    bankIfscCode: {
      type: String,
      lowercase: false,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    bankAccNo: {
      type: String,
      required: false,
    },
    branchHeadName: {
      type: String,
      required: false
    },
    branchContact: {
      type: Number,
      required: false,
    },
    branch: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
      autopopulate: true
    },
    status: {
      type: Number,
      enum: [0, 1, 2], // 0 is Active, 1 is inActive, 2 is Terminate
      default: 0
    },
    aadhar_card_no: {
      type: String,
      required: false,
    },
    pan_card_no: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
empSchema.plugin(toJSON);
empSchema.plugin(paginate);
empSchema.plugin(require('mongoose-autopopulate'));

/**
 * Check if email is taken
 * @param {string} email - The emp's email
 * @param {ObjectId} [excludeEmpId] - The id of the emp to be excluded
 * @returns {Promise<boolean>}
 */
empSchema.statics.isEmailTaken = async function (email, excludeEmpId) {
  const emp = await this.findOne({ email, _id: { $ne: excludeEmpId } });
  return !!emp;
};

// empSchema.statics.isEmpNameTaken = async function (name, excludeEmpId) {
//   const emp = await this.findOne({ name, _id: { $ne: excludeEmpId } });
//   return !!emp;
// };

/**
 * Check if password matches the emp's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
empSchema.methods.isPasswordMatch = async function (password) {
  const emp = this;
  return bcrypt.compare(password, emp.password);
};

empSchema.pre('save', async function (next) {
  const emp = this;
  if (emp.isModified('password')) {
    emp.password = await bcrypt.hash(emp.password, 8);
  }
  next();
});

/**
 * @typedef Emp
 */
const Emp = mongoose.model('Emp', empSchema);

module.exports = Emp;
