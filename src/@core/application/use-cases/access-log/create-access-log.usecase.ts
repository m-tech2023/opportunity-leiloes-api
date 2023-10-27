import { AccessLogService } from '../../services/access-log/access-log.service';
import { AccessLogDto } from '../../dto/requests/access-log/access-log.dto';
import { AccessLog } from '../../../domain/entities/access-log/access-log.entity';

export class CreateAccessLogUsecase {
  constructor(private readonly accessLogService: AccessLogService) {}

  async execute(createAccessLogDto: AccessLogDto) {
    const log = AccessLog.create(createAccessLogDto as any).getLog();
    return await this.accessLogService.createLog(log);
  }
}
