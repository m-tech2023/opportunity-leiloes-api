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
import { UserRepository } from 'src/@core/infra/databases/mongodb/repositories/users/user.repository';
import User from 'src/@core/infra/databases/mongodb/schemas/users/user.schema';
import { AuthController } from 'src/@core/presentation/controllers/auth/auth.controller';
import { AuthenticationStrategy } from './strategies/authentication/authentication.strategy';
import { AuthorizationStrategy } from './strategies/authorization/authorization.strategy';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: User,
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
		AuthenticationStrategy,
		AuthorizationStrategy,
		UserRepository,
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
			useFactory: (loginByEmailUseCase: LoginByEmailUseCase, loginByDocumentUseCase: LoginByDocumentUseCase) => {
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
	],
})
export class AuthModule {}
