import { PersonalDataService } from 'src/@core/application/services/account/personal-data.service';
export class GetPersonalDataUsecase {
  constructor(private readonly personalDataService: PersonalDataService) {}

  async execute(userId: string) {
    return await this.personalDataService.get(userId);
  }
}
