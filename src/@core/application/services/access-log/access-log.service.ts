import { Injectable } from '@nestjs/common';
import { AccessLogRepository } from '../../../infra/databases/mongodb/repositories/access-logs/access-log.repository';
import { AccessLog } from '../../../domain/entities/access-log/access-log.entity';

@Injectable()
export class AccessLogService {
  constructor(private readonly accessLogRepository: AccessLogRepository) {}

  async createLog(data: AccessLog) {
    return await this.accessLogRepository.create(data);
  }
  async getAll(userId: string) {
    return await this.accessLogRepository.getAll(userId);
  }
}
