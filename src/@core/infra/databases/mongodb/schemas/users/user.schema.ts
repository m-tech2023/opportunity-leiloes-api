import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: new mongoose.Types.ObjectId()
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
    unique: true,
  },
  documentName: {
    type: String,
    required: true,
    trim: true,
  },
  roleId: {
    type: String,
    required: true,
    trim: true,
  },
  confirmed: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: null,
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
});

export default userSchema;
