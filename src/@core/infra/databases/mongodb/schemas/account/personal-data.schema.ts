import mongoose, { Schema } from 'mongoose';

const personalDataSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: new mongoose.Types.ObjectId(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  registrationData: {
    fullName: {
      type: String,
      required: false,
      trim: true,
    },
    document: {
      cpf: {
        type: String,
        required: false,
        trim: true,
        default: null,
      },
      rg: {
        type: String,
        required: false,
        trim: true,
        default: null,
      },
      passport: {
        type: String,
        required: false,
        trim: true,
        default: null,
      },
    },
    nationality: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    maritalStatus: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    motherName: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    fatherName: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    occupation: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    company: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    companyWebsite: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
  },
  contactDetails: {
    telephone: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    cellPhone: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
  },
  address: {
    zipCode: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    address: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    number: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    neighborhood: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    city: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    state: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
  },
});

export default personalDataSchema;
