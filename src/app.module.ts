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

@Module({
  imports: [UsersModule, CommonModule],
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
