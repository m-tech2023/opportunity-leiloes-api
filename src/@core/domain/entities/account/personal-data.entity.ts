import mongoose from 'mongoose';

type PersonalDataProps = {
  id?: string;
  userId?: string;
  updatedAt?: string;
  registrationData?: {
    fullName?: string;
    document?: {
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

export class PersonalData {
  private readonly props: PersonalDataProps;

  private constructor(props: PersonalDataProps) {
    this.props = props;
  }

  static create(props: PersonalDataProps) {
    return new PersonalData(props);
  }

  get id() {
    if (!this.props.id) {
      return new mongoose.Types.ObjectId().toString();
    }
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  get registrationData() {
    return this.props.registrationData;
  }

  get contactDetails() {
    return this.props.contactDetails;
  }

  get address() {
    return this.props.address;
  }

  getPersonalData() {
    return {
      id: this.id,
      userId: this.userId,
      updatedAt: this.updatedAt,
      registrationData: this.registrationData,
      contactDetails: this.contactDetails,
      address: this.address,
    } as PersonalData;
  }

  getPersonalDataJson() {
    return JSON.stringify(this.getPersonalData());
  }
}
