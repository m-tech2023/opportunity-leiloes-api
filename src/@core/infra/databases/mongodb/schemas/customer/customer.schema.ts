import mongoose, { Schema } from 'mongoose';

const customerSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: new mongoose.Types.ObjectId(),
  },
  isValidCustomer: {
    type: Boolean,
    required: false,
    default: false,
  },
  isRestricted: {
    type: Boolean,
    required: false,
    default: false,
  },
  roleName: {
    type: String,
    ref: 'Roles',
    required: false,
    default: null,
    trim: true,
  },
  confirmedAt: {
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
  personalData: {
    type: {
      registrationData: {
        type: {
          fullName: { type: String, required: false, trim: true },
          document: {
            cnpj: {
              type: String,
              required: false,
              unique: true,
              sparse: true,
              trim: true,
            },
            ie: {
              type: String,
              sparse: true,
              required: false,
              unique: true,
              trim: true,
            },
            cpf: {
              type: String,
              required: false,
              unique: true,
              sparse: true,
              trim: true,
            },
            rg: {
              type: String,
              required: false,
              unique: true,
              sparse: true,
              trim: true,
            },
            passport: {
              type: String,
              required: false,
              unique: true,
              sparse: true,
              trim: true,
            },
          },
          nationality: {
            type: String,
            sparse: true,
            required: false,
            trim: true,
          },
          maritalStatus: {
            type: String,
            sparse: true,
            required: false,
            trim: true,
          },
          motherName: {
            type: String,
            sparse: true,
            required: false,
            trim: true,
          },
          fatherName: {
            type: String,
            sparse: true,
            required: false,
            trim: true,
          },
          occupation: {
            type: String,
            sparse: true,
            required: false,
            trim: true,
          },
          company: { type: String, sparse: true, required: false, trim: true },
          companyWebsite: {
            type: String,
            sparse: true,
            required: false,
            trim: true,
          },
        },
        required: true,
      },
      contactDetails: {
        type: {
          telephone: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
            trim: true,
          },
          cellPhone: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
            trim: true,
          },
          email: {
            type: String,
            required: true,
            unique: true,
            sparse: true,
            trim: true,
          },
        },
        required: true,
      },
      address: {
        type: {
          zipCode: { type: String, sparse: true, required: false, trim: true },
          address: { type: String, sparse: true, required: false, trim: true },
          number: { type: String, sparse: true, required: false, trim: true },
          neighborhood: {
            type: String,
            sparse: true,
            required: false,
            trim: true,
          },
          city: { type: String, sparse: true, required: true, trim: true },
          state: { type: String, sparse: true, required: true, trim: true },
        },
        required: false,
      },
    },
    required: true,
  },
  propertyData: {
    type: {
      farmName: { type: String, required: false, trim: true, sparse: true },
      contactDetails: {
        type: {
          telephone: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
            trim: true,
          },
          cellPhone: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
            trim: true,
          },
          email: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
            trim: true,
          },
        },
        required: false,
      },
      address: {
        type: {
          zipCode: { type: String, required: false, trim: true },
          address: { type: String, required: false, trim: true },
          number: { type: String, required: false, trim: true },
          neighborhood: { type: String, required: false, trim: true },
          city: { type: String, required: true, trim: true },
          state: { type: String, required: true, trim: true },
        },
        required: false,
      },
    },
    default: null,
    required: false,
  },
  accessData: {
    type: {
      email: { type: String, required: true, trim: true },
      password: { type: String, required: true, trim: true },
    },
    required: false,
  },
  myFavorites: {
    type: Object,
    required: false,
    default: null,
  },
  myBids: {
    type: Object,
    required: false,
    default: null,
  },
});

export default customerSchema;
