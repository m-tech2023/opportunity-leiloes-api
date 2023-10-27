import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessLogDto } from '../../../../../application/dto/requests/access-log/access-log.dto';
import { AccessLog } from '../../../../../domain/entities/access-log/access-log.entity';

@Injectable()
export class AccessLogRepository {
  constructor(
    @InjectModel('AccessLog') private readonly accessLog: Model<AccessLogDto>,
  ) {}

  async create(dto: AccessLog) {
    return await this.accessLog.create(dto);
  }
}
