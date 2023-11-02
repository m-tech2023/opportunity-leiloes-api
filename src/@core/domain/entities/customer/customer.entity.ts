import mongoose from 'mongoose';

type CustomerProps = {
  id?: string;
  preRegistrationId: string;
  isValidCustomer: boolean;
  roleId: string;
  createdAt?: Date;
  confirmedAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  personalData: {
    registrationData: {
      fullName: string;
      document: {
        cnpj?: string;
        is?: string;
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
  accessData?: {};
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
  get preRegistrationId() {
    return this.props.preRegistrationId;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get roleId() {
    return this.props.roleId;
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
    return this.props.accessData;
  }

  getAccountDetails() {
    return {
      id: this.id,
      preRegistrationId: this.preRegistrationId,
      isValidCustomer: this.isValidCustomer,
      roleId: this.roleId,
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

  getAccountDetailsJson() {
    return JSON.stringify(this.getAccountDetails());
  }
}
