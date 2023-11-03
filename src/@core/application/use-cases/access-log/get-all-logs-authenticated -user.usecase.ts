import { AccessLogService } from 'src/@core/application/services/access-log/access-log.service';
export class GetAllLogsAuthenticatedUserUsecase {
  constructor(private readonly AccessLogService: AccessLogService) {}

  async execute(userId: string) {
    return await this.AccessLogService.getAll(userId);
  }
}
