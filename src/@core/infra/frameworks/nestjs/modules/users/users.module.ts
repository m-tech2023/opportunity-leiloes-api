import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/@core/application/services/users/user.service';
import { CreateUserUseCase } from 'src/@core/application/use-cases/users/create-user.usecase';
import { DestroyUserUseCase } from 'src/@core/application/use-cases/users/destroy-user.usecase';
import { FindByEmailUseCase } from 'src/@core/application/use-cases/users/find-by-email.usecase';
import { FindByIdUseCase } from 'src/@core/application/use-cases/users/find-by-id.usecase';
import { GetAllUseCase } from 'src/@core/application/use-cases/users/get-all.usecase';
import { UpdateUserUseCase } from 'src/@core/application/use-cases/users/update-user.usecase';
import { UserRepository } from 'src/@core/infra/databases/mongodb/repositories/users/user.repository';
import User from 'src/@core/infra/databases/mongodb/schemas/users/user.schema';
import { EmailAlreadyUsedRule } from 'src/@core/infra/validations/rules/email-already-used';
import { UsersController } from 'src/@core/presentation/controllers/users/users.controller';
import { FindUserMiddleware } from './middlewares/find-user/find-user.middleware';
import { PreSavePersonalDataUsecase } from 'src/@core/application/use-cases/account/pre-save-personal-data.usercase';
import { PersonalDataRepository } from 'src/@core/infra/databases/mongodb/repositories/account/personal-data.repository';
import { PersonalDataService } from 'src/@core/application/services/account/personal-data.service';
import personalDataSchema from 'src/@core/infra/databases/mongodb/schemas/account/personal-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: User,
      },
      {
        name: 'PersonalData',
        schema: personalDataSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    FindUserMiddleware,
    PersonalDataRepository,
    {
      provide: GetAllUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new GetAllUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new CreateUserUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new UpdateUserUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
    {
      provide: FindByIdUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new FindByIdUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
    {
      provide: FindByEmailUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new FindByEmailUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
    {
      provide: DestroyUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new DestroyUserUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
    {
      provide: PreSavePersonalDataUsecase,
      useFactory: (personalDataRepository: PersonalDataRepository) => {
        return new PreSavePersonalDataUsecase(
          new PersonalDataService(personalDataRepository),
        );
      },
      inject: [PersonalDataRepository],
    },
    UserRepository,
    EmailAlreadyUsedRule,
  ],
  exports: [
    GetAllUseCase,
    FindByEmailUseCase,
    FindByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DestroyUserUseCase,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FindUserMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.GET })
      .apply(FindUserMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.PUT })
      .apply(FindUserMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });
  }
}
