import { AccessLog } from '../../../domain/entities/access-log/access-log.entity';
import { AccessLogDto } from '../../dto/requests/access-log/access-log.dto';
import { AccessLogService } from '../../services/access-log/access-log.service';

export class CreateAccessLogUsecase {
  constructor(private readonly accessLogService: AccessLogService) {}

  async execute(createAccessLogDto: AccessLogDto) {
    console.log(this.accessLogService);
    const accessLog = AccessLog.create(
      createAccessLogDto as AccessLog,
    ).getLog();
    return await this.accessLogService.createLog(accessLog);
  }
}
