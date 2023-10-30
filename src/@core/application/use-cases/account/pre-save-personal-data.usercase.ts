import { PersonalData } from 'src/@core/domain/entities/account/personal-data.entity';
import { PreSavePersonalDataDto } from '../../dto/requests/account/pre-save-personal-data.dto';
import { PersonalDataService } from '../../services/account/personal-data.service';

export class PreSavePersonalDataUsecase {
  constructor(private readonly personalDataService: PersonalDataService) {}

  async execute(preSavePersonalDataDto: PreSavePersonalDataDto) {
    const personalData = PersonalData.create(
      preSavePersonalDataDto as any,
    ).getPersonalData();
    return await this.personalDataService.createPreSave(personalData);
  }
}
