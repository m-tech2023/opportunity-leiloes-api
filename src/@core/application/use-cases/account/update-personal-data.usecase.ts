import { PersonalDataService } from 'src/@core/application/services/account/personal-data.service';
import { UpdatePersonalDataDto } from '../../dto/requests/account/update-personal-data.dto';
export class UpdatePersonalDataUsecase {
  constructor(private readonly personalDataService: PersonalDataService) {}

  async execute(userId: string, data: UpdatePersonalDataDto) {
    return await this.personalDataService.update(userId, data);
  }
}
