import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { WrapDataInterceptor } from './common/interceptors/wrap-data/wrap-data.interceptor';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? 'config/.development.env'
          : process.env.NODE_ENV === 'staging'
            ? 'config/.staging.env'
            : 'config/.production.env',
      // ignoreEnvFile: true,
      // to can access env variables in other modules we use isGlobal option (isGlobal:true)
      isGlobal: true,
      // to can access ormConfig file and ormConfigProd file based on NODE_ENV we must sent it in load option array from ConfigModule
      load: [ormConfig, ormConfigProd],
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV === 'development' ? ormConfig : ormConfigProd,
    }),
  ],
  providers: [
    // interceptor to enable transformation operations global like exclude and expose
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: WrapDataInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // ✅ Apply middleware globally to all routes in case the middleware have dependencies
    // consumer.apply(LoggerMiddleware).forRoutes('*');
    // ======================================================================================
    // to apply LoggerMiddleware on all routes for users
    // consumer.apply(LoggerMiddleware).forRoutes('users');
    // ======================================================================================
    // to apply LoggerMiddleware on Just GET Http Method for endpoints have /users
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes(
    //     { path: 'users', method: RequestMethod.GET },
    //     { path: 'users', method: RequestMethod.POST },
    //   );
    // ======================================================================================
    // to exclude routes (don't apply middleware on excluded routes)
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.PATCH },
        { path: 'users', method: RequestMethod.DELETE },
      )
      .forRoutes(UsersController);
  }
}
