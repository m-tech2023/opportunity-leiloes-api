import { Injectable } from '@nestjs/common';
import { AccessLog } from 'src/@core/domain/entities/access-log/access-log.entity';
import { PrismaService } from '../../prisma.service';
@Injectable()
export class AccessLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(accessLog: AccessLog) {
    return await this.prisma.accessLog.create({
      data: accessLog,
    });
  }

  async getAll(userId: string) {
    return await this.prisma.accessLog.findMany({ where: { userId } });
  }
}
