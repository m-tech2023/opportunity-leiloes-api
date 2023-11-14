import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport/dist';
import { env } from 'process';
import { UserService } from 'src/@core/application/services/users/user.service';
import { LoginByDocumentUseCase } from 'src/@core/application/use-cases/login/login-by-document.usecase';
import { LoginByEmailUseCase } from 'src/@core/application/use-cases/login/login-by-email.usecase';
import { LoginUseCase } from 'src/@core/application/use-cases/login/login.usecase';
import { FindByEmailUseCase } from 'src/@core/application/use-cases/users/find-by-email.usecase';
import User from 'src/@core/infra/databases/mongodb/schemas/users/user.schema';
import { AuthController } from 'src/@core/presentation/controllers/auth/auth.controller';
import { AuthenticationStrategy } from './strategies/authentication/authentication.strategy';
import { AuthorizationStrategy } from './strategies/authorization/authorization.strategy';
import { FindByUsernameUseCase } from '../../../../../application/use-cases/users/find-by-username.usecase';
import { CreateAccessLogUsecase } from '../../../../../application/use-cases/access-log/create-access-log.usecase';
import { AccessLogService } from '../../../../../application/services/access-log/access-log.service';
import accessLog from 'src/@core/infra/databases/mongodb/schemas/access-logs/access-log.schema';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { PrismaService } from 'src/@core/infra/databases/prisma/prisma.service';
import { AccessLogRepository } from 'src/@core/infra/databases/prisma/repositories/access-log/access-log.repository';

@Module({
  imports: [
    PrismaService,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: User,
      },
      {
        name: 'AccessLog',
        schema: accessLog,
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthenticationStrategy,
    AuthorizationStrategy,
    UserRepository,
    AccessLogService,
    AccessLogRepository,
    {
      provide: UserService,
      useFactory: (userRepository: UserRepository) => {
        return new UserService(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: LoginByEmailUseCase,
      useFactory: (userService: UserService, jwtService: JwtService) => {
        return new LoginByEmailUseCase(userService, jwtService);
      },
      inject: [UserService, JwtService],
    },
    {
      provide: LoginUseCase,
      useFactory: (
        loginByEmailUseCase: LoginByEmailUseCase,
        loginByDocumentUseCase: LoginByDocumentUseCase,
      ) => {
        return new LoginUseCase(loginByEmailUseCase, loginByDocumentUseCase);
      },
      inject: [LoginByEmailUseCase, LoginByDocumentUseCase],
    },
    {
      provide: LoginByDocumentUseCase,
      useFactory: (userService: UserService, jwtService: JwtService) => {
        return new LoginByDocumentUseCase(userService, jwtService);
      },
      inject: [UserService, JwtService],
    },
    {
      provide: FindByEmailUseCase,
      useFactory: (userService: UserService) => {
        return new FindByEmailUseCase(userService);
      },
      inject: [UserService],
    },
    {
      provide: FindByUsernameUseCase,
      useFactory: (userService: UserService) => {
        return new FindByUsernameUseCase(userService);
      },
      inject: [UserService],
    },
    {
      provide: CreateAccessLogUsecase,
      useFactory: (accessLogService: AccessLogService) => {
        return new CreateAccessLogUsecase(accessLogService);
      },
      inject: [AccessLogService],
    },
  ],
})
export class AuthModule {}
