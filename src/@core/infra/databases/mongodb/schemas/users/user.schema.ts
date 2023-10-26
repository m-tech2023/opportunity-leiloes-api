import { Schema } from 'mongoose';
import { hash } from 'src/@core/infra/utils/uuid/uuid.util';

const userSchema = new Schema({
  id: {
    type: String,
    default: () => hash(),
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
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  document: {
    type: String,
    required: true,
    trim: true,
    documentType: String,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  confirmed: Date,
  updatedAt: Date,
  deleteAt: Date,
});

export default userSchema;
