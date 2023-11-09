export class PreSaveCustomerPersonalDataDto {
  id?: string;
  preRegistrationId?: string;
  personalData: {
    registrationData: {
      fullName: string;
      // deixar sem ??
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
