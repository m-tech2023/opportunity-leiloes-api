import { RegistrationData } from './../../dto/requests/account/registration-data.dto';
import { PersonalDataService } from 'src/@core/application/services/account/personal-data.service';
import { UpdatePersonalDataDto } from '../../dto/requests/account/update-personal-data.dto';
import { PersonalData } from 'src/@core/domain/entities/account/personal-data.entity';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { onlyNumbers } from 'src/@core/infra/utils/regex/clean-numeric-str';
export class UpdatePersonalDataUsecase {
  constructor(private readonly personalDataService: PersonalDataService) {}

  async execute(userId: string, data: UpdatePersonalDataDto) {
    const personalData = PersonalData.create(data as any).getPersonalData();

    const findUserByEmail = await this.personalDataService.findByEmail(
      personalData.contactDetails.email,
    );
    if (findUserByEmail) {
      console.log("XXXXXXXXXXXXXXXXXXXXXX")
      throw new Error('User already registered with this e-mail address.');
    }

    // const validDocument =
    //   cpf.isValid(data.registrationData.document.cpf) ||
    //   cnpj.isValid(data.registrationData.document.cnpj);
    // let dataDocument = {
    //   document: personalData.registrationData.document,
    // };

    // if (validDocument) {
    //   dataDocument = {
    //     document: onlyNumbers(personalData.document),
    //   };
    // }

    // const findUserByDocument = await this.personalDataService.findByDocument(
    //   personalData.registrationData.document,
    // );
    // if (findUserByDocument) {
    //   console.log("XXXXXXXXXXXXXXXXXXXXXX")
    //   throw new Error('User already registered with this document.');
    // }
    return await this.personalDataService.update(userId, data);
  }
}
