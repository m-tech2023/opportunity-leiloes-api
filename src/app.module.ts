import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './@core/infra/frameworks/nestjs/modules/auth/auth.module';
import { DeletedAtMiddleware } from './@core/infra/frameworks/nestjs/modules/users/middlewares/deleted-at/deleted-at-middleware';
import { UsersModule } from './@core/infra/frameworks/nestjs/modules/users/users.module';
import { AccountModule } from './@core/infra/frameworks/nestjs/modules/account/account.module';
import { ManagerModule } from './@core/infra/frameworks/nestjs/modules/manager/manager.module';
import { PrismaService } from './@core/infra/databases/prisma/prisma.service';

@Module({
  imports: [
    PrismaService,
    UsersModule,
    AuthModule,
    AccountModule,
    ManagerModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        // Isso permite todas as origens, mas pode ser configurado para origens específicas
        // REMOVER DEPOIS
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Methods',
          'GET, PUT, POST, DELETE, OPTIONS',
        );
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        );
        next();
      })
      .forRoutes('*')
      .apply(DeletedAtMiddleware)
      .forRoutes('*');
  }
}
