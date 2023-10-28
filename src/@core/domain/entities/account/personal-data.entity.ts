import mongoose from 'mongoose';

type PersonalDataProps = {
  id?: string;
  userId?: string;
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

  save() {
    console.log(this.props);
  }

  //implementar o restante
}
