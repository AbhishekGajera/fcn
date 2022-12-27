const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { number } = require('joi');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      unique: false,
      default: this.first_name + ' ' + this.last_name
    },
    first_name: {
      type: String,
      required: false,
      trim: true,
      unique: true
    },
    last_name: {
      type: String,
      required: false,
      trim: true,
      unique: true
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
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
    registrationType: {
      type: String,
      default: 'normal'
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
    image: {
      type: String, required: false
    },
    avatar: {
      type: String, required: false
    },

    country: {
      type: String,
      required: true,
      default: 'India'
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
      type: String,
      required: false,
    },
    IBO: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
      autopopulate: true
    },
    products: [{
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: false,
        autopopulate: true
      },

      minAmount: {
        type: Number,
        required: false,
        default: 0
      },
      maxAmount: {
        type: Number,
        required: false,
        default: 0
      }
    }],
    total_earning: {
      type: Number,
      required: false,
      default: 0
    },
    image: { type: String, required: false },

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
    },
    aadhar_card_img : {
      type: String,
      required: false,
    },
    pan_card_img : {
      type: String,
      required: false,
    },
    b_head_name: {
      type: String,
      default: ''
    },
    b_head_contact_no: {
      type: String,
      default: ''
    },
    b_aadhar_card_no: {
      type: String,
      default: ''
    },
    b_pan_card_no: {
      type: String,
      default: ''
    },
    self_declaration: {
      type: String,
      default: ''
    },
    registration_date: {
      type: Date,
      default: ''
    },
    maturity_date: {
      type: Date,
      default: ''
    },
    perfomance: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
userSchema.plugin(require('mongoose-autopopulate'));

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// userSchema.statics.isUserNameTaken = async function (name, excludeUserId) {
//   const user = await this.findOne({ name, _id: { $ne: excludeUserId } });
//   return !!user;
// };

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
