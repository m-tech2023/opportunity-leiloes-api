import { Schema } from 'mongoose';

const accessLogSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  geolocalization: {
    type: String,
    required: true,
  },
  accessedAt: {
    type: Date,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

export default accessLogSchema;
