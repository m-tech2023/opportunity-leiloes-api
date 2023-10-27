import mongoose from 'mongoose';

export function objectId() {
  return new mongoose.Types.ObjectId().toString();
}
