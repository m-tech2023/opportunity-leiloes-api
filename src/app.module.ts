import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './@core/infra/frameworks/nestjs/modules/auth/auth.module';
import { DeletedAtMiddleware } from './@core/infra/frameworks/nestjs/modules/users/middlewares/deleted-at/deleted-at-middleware';
import { UsersModule } from './@core/infra/frameworks/nestjs/modules/users/users.module';
import { AccessLogModule } from './@core/infra/frameworks/nestjs/modules/access-log/access-log.module';

@Module({
  imports: [
    AccessLogModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeletedAtMiddleware).forRoutes('*');
  }
}
