import { UpdatePropertyDataUsecase } from '../../../../../application/use-cases/account/property-data/update-property.usecase';
import { Module } from '@nestjs/common';
import { AccessLogController } from 'src/@core/presentation/controllers/account/access-log.controller';
import { GetAllLogsAuthenticatedUserUsecase } from 'src/@core/application/use-cases/access-log/get-all-logs-authenticated -user.usecase';
import { AccessLogService } from 'src/@core/application/services/access-log/access-log.service';
import { PersonalDataController } from 'src/@core/presentation/controllers/account/personal-data.controller';
import { GetPersonalDataUsecase } from 'src/@core/application/use-cases/account/personal-data/get-personal-data.usecase';
import { PersonalDataRepository } from 'src/@core/infra/databases/prisma/repositories/account/personal-data.repository';
import { PersonalDataService } from 'src/@core/application/services/account/personal-data/personal-data.service';
import { UpdatePersonalDataUsecase } from '../../../../../application/use-cases/account/personal-data/update-personal-data.usecase';
import { PropertyDataController } from 'src/@core/presentation/controllers/account/property-data.controller';
import { PropertyDataRepository } from 'src/@core/infra/databases/prisma/repositories/account/property-data.repository';
import { PropertyDataService } from 'src/@core/application/services/account/property-data/property-data.service';
import { GetPropertyDataUsecase } from 'src/@core/application/use-cases/account/property-data/get-property.usecase';
import { AccessLogRepository } from 'src/@core/infra/databases/prisma/repositories/access-log/access-log.repository';
import { PrismaService } from 'src/@core/infra/databases/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [
    AccessLogController,
    PersonalDataController,
    PropertyDataController,
  ],
  providers: [
    PrismaService,
    AccessLogRepository,
    PersonalDataRepository,
    PropertyDataRepository,
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
    {
      provide: UpdatePropertyDataUsecase,
      useFactory: (propertyDataRepository: PropertyDataRepository) => {
        return new UpdatePropertyDataUsecase(
          new PropertyDataService(propertyDataRepository),
        );
      },
      inject: [PropertyDataRepository],
    },
    {
      provide: GetPropertyDataUsecase,
      useFactory: (propertyDataRepository: PropertyDataRepository) => {
        return new GetPropertyDataUsecase(
          new PropertyDataService(propertyDataRepository),
        );
      },
      inject: [PropertyDataRepository],
    },
  ],
})
export class AccountModule {}
