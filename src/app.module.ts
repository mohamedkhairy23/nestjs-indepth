import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { WrapDataInterceptor } from './common/interceptors/wrap-data/wrap-data.interceptor';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { CommonModule } from './common/common.module';

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
export class AppModule {}
