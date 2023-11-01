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
    unique: true, // TESTAR
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now,
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
        unique: true,
        sparse: true, // Permite valores nulos
        trim: true,
      },
      cnpj: {
        type: String,
        unique: true,
        sparse: true, // Permite valores nulos
        required: false,
        trim: true,
      },
      rg: {
        type: String,
        required: false,
        unique: true,
        sparse: true, // Permite valores nulos
        trim: true,
      },
      passport: {
        sparse: true, // Permite valores nulos
        type: String,
        unique: true,
        required: false,
        trim: true,
      },
      ie: {
        sparse: true, // Permite valores nulos
        type: String,
        required: false,
        unique: true,
        trim: true,
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
      sparse: true, // Permite valores nulos
      required: false,
      unique: true,
      trim: true,
    },
    cellPhone: {
      type: String,
      sparse: true, // Permite valores nulos
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Permite valores nulos
      trim: true,
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
