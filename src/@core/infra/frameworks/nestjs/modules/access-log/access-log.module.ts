import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AccessLog from '../../../../databases/mongodb/schemas/access-logs/access-log.schema';
import { UsersModule } from '../users/users.module';
import { AccessLogService } from '../../../../../application/services/access-log/access-log.service';
import { AccessLogRepository } from '../../../../databases/mongodb/repositories/access-logs/access-log.repository';
import { CreateAccessLogUsecase } from '../../../../../application/use-cases/access-log/create-access-log.usecase';

@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class AccessLogModule {}
