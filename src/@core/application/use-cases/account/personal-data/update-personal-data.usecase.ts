import { PersonalDataService } from 'src/@core/application/services/account/personal-data/personal-data.service';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { UpdatePersonalDataDto } from 'src/@core/application/dto/requests/customer/account/update-personal-data.dto';

export class UpdatePersonalDataUsecase {
  constructor(private readonly personalDataService: PersonalDataService) {}

  async execute(userId: string, personalDto: UpdatePersonalDataDto) {
    const cpfValue = personalDto.document.cpf;
    const cnpjValue = personalDto.document.cnpj;
    if (cpfValue) {
      if (cpfValue.length > 0 && !cpf.isValid(cpfValue)) {
        throw new Error('CPF is invalid');
      }
    }
    if (cnpjValue) {
      if (cnpjValue.length > 0 && !cnpj.isValid(cnpjValue)) {
        throw new Error('CNPJ is invalid');
      }
    }
    return await this.personalDataService.update(userId, personalDto);
  }
}
