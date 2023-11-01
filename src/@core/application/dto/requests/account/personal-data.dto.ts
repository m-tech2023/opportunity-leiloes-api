export class PersonalDataDto {
  id?: string;
  userId?: string;
  updatedAt?: string;
  registrationData?: {
    fullName?: string;
    document?: {
      cpf?: string;
      cnpj?: string;
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
}
