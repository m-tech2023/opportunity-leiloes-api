export class PreSaveCustomerPersonalDataDto {
  id?: string;
  preRegistrationId?: string;
  personalData: {
    registrationData: {
      fullName: string;
      document?: {
        cpf?: string;
        cnpj?: string;
        passport?: string;
      };
    };
    contactDetails: {
      email: string;
    };
  };
  accessData?: {
    email?: string;
    password?: string;
  };
}
