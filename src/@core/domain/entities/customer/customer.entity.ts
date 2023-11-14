import mongoose from 'mongoose';
import { passwordHash } from 'src/@core/infra/utils/password-hash/password-hash.util';

type CustomerProps = {
  id?: string;
  isValidCustomer?: boolean;
  isRestricted?: boolean;
  roleName: string;
  createdAt?: Date;
  confirmedAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  personalData: {
    registrationData: {
      fullName: string;
      document: {
        cnpj?: string;
        ie?: string;
        cpf?: string;
        rg?: string;
        passport?: string;
      };
      nationality?: string;
      maritalStatus?: string;
      motherName?: string;
      fatherName?: string;
      occupation?: string;
      company?: string;
      companyWebsite?: string;
    };
    contactDetails: {
      telephone?: string;
      cellPhone?: string;
      email: string;
    };
    address?: {
      zipCode?: string;
      address?: string;
      number?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
    };
  };
  propertyData?: {
    farmName: string;
    contactDetails?: {
      telephone?: string;
      cellPhone?: string;
      email?: string;
    };
    address?: {
      zipCode?: string;
      address?: string;
      number?: string;
      neighborhood?: string;
      city?: string;
      state?: string;
    };
  };
  accessData: {
    email: string;
    password: string;
  };
  myFavorites?: {};
  myBids?: {};
};

export class Customer {
  private readonly props: CustomerProps;

  private constructor(props: CustomerProps) {
    this.props = props;
  }

  static create(props: CustomerProps) {
    return new Customer(props);
  }

  get id() {
    if (!this.props.id) {
      return new mongoose.Types.ObjectId().toString();
    }
    return this.props.id;
  }

  get isValidCustomer() {
    return this.props.isValidCustomer;
  }

  get isRestricted() {
    return this.props.isRestricted;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get roleName() {
    return this.props.roleName;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get confirmedAt() {
    return this.props.confirmedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  get personalData() {
    return this.props.personalData;
  }

  get propertyData() {
    return this.props.propertyData;
  }

  get myFavorites() {
    return this.props.myFavorites;
  }

  get myBids() {
    return this.props.myBids;
  }

  get accessData() {
    return {
      email: this.props.accessData.email.toLowerCase(),
      password: passwordHash(this.props.accessData.password),
    };
  }

  getCustomer() {
    return {
      id: this.id,
      isValidCustomer: this.isValidCustomer,
      isRestricted: this.isRestricted,
      roleName: this.roleName,
      createdAt: this.createdAt,
      confirmedAt: this.confirmedAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      personalData: this.personalData,
      propertyData: this.propertyData,
      myBids: this.myBids,
      myFavorites: this.myFavorites,
      accessData: this.accessData,
    };
  }

  getCustomerJson() {
    return JSON.stringify(this.getCustomer());
  }
}
