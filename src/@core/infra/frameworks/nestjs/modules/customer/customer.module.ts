import { AccessLogRepository } from '../../../../databases/mongodb/repositories/access-logs/access-log.repository';
import { Module } from '@nestjs/common';
import Customer from 'src/@core/infra/databases/mongodb/schemas/customer/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessLogController } from 'src/@core/presentation/controllers/customer/access-log.controller';
import { GetAllLogsAuthenticatedUserUsecase } from 'src/@core/application/use-cases/access-log/get-all-logs-authenticated -user.usecase';
import { AccessLogService } from 'src/@core/application/services/access-log/access-log.service';
import accessLogSchema from 'src/@core/infra/databases/mongodb/schemas/access-logs/access-log.schema';
import { PersonalDataController } from 'src/@core/presentation/controllers/customer/personal-data.controller';
import { GetPersonalDataUsecase } from 'src/@core/application/use-cases/customer/personal-data/get-personal-data.usecase';
import { PersonalDataRepository } from 'src/@core/infra/databases/mongodb/repositories/customer/personal-data.repository';
import { PersonalDataService } from 'src/@core/application/services/customer/personal-data/personal-data.service';
import { UpdatePersonalDataUsecase } from '../../../../../application/use-cases/customer/personal-data/update-personal-data.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: Customer,
      },
      {
        name: 'AccessLog',
        schema: accessLogSchema,
      },
    ]),
  ],
  controllers: [AccessLogController, PersonalDataController],
  providers: [
    AccessLogRepository,
    PersonalDataRepository,
    {
      provide: GetAllLogsAuthenticatedUserUsecase,
      useFactory: (accessLogRepository: AccessLogRepository) => {
        return new GetAllLogsAuthenticatedUserUsecase(
          new AccessLogService(accessLogRepository),
        );
      },
      inject: [AccessLogRepository],
    },
    {
      provide: GetPersonalDataUsecase,
      useFactory: (personalDataRepository: PersonalDataRepository) => {
        return new GetPersonalDataUsecase(
          new PersonalDataService(personalDataRepository),
        );
      },
      inject: [PersonalDataRepository],
    },
    {
      provide: UpdatePersonalDataUsecase,
      useFactory: (personalDataRepository: PersonalDataRepository) => {
        return new UpdatePersonalDataUsecase(
          new PersonalDataService(personalDataRepository),
        );
      },
      inject: [PersonalDataRepository],
    },
  ],
})
export class CustomerDataModule {}
