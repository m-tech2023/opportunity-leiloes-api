import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './@core/infra/frameworks/nestjs/modules/auth/auth.module';
import { DeletedAtMiddleware } from './@core/infra/frameworks/nestjs/modules/users/middlewares/deleted-at/deleted-at-middleware';
import { UsersModule } from './@core/infra/frameworks/nestjs/modules/users/users.module';
import { CustomerDataModule } from './@core/infra/frameworks/nestjs/modules/customer/customer.module';
import { ManagerModule } from './@core/infra/frameworks/nestjs/modules/manager/manager.module';
import { PrismaService } from './@core/infra/databases/prisma/prisma.service';

@Module({
  imports: [
    PrismaService,
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    CustomerDataModule,
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
