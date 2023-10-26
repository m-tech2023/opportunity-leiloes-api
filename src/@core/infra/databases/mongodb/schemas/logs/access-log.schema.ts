import { Schema } from 'mongoose';
import { hash } from 'src/@core/infra/utils/uuid/uuid.util';

const accessLogSchema = new Schema({
  uuid: {
    type: String,
    default: () => hash(),
  },
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
});

export default accessLogSchema;
