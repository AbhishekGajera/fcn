const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

//salary

const leaveSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
    total_leave: {
      type: Number,
      required: true,
    },
    date_from: {
      type: Date,
      required: true,
    },
    date_to: {
        type: Date,
        required: true,
    },
    leave_status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
leaveSchema.plugin(toJSON);

/**
 * @typedef Leave
 */
const Leave = mongoose.model('leave', leaveSchema);

module.exports = Leave;
