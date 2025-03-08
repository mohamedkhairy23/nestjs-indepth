import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_NAME } from './user.constants';

class MockUserService {
  findUsers() {
    return ['user1', 'user2'];
  }
}

abstract class ConfigService {}
class DevelopmentConfigService extends ConfigService {}
class ProductionConfigService extends ConfigService {}

@Module({
  controllers: [UsersController],
  // Standard Provider
  // providers: [UsersService],
  // providers: [
  //   {
  //     provide: UsersService,
  //     useClass: UsersService,
  //   },
  // ],
  providers: [
    // Standard Provider
    UsersService,
    // Custom Provider
    // value based provider
    // {
    //   provide: UsersService,
    //   // Value provider: Inject constant value or for testing purposes
    //   useValue: new MockUserService(),
    // },
    // value based provider
    {
      provide: APP_NAME,
      // Value provider: Inject constant value or for testing purposes
      useValue: 'Nest Demo APP',
    },
    // class based provider (Provide class as a token and resolve class)
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
})
export class UsersModule {}
