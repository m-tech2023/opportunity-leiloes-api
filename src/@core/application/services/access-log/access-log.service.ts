import { Injectable } from '@nestjs/common';
import { AccessLog } from '../../../domain/entities/access-log/access-log.entity';
import { AccessLogRepository } from 'src/@core/infra/databases/prisma/repositories/access-log/access-log.repository';

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
