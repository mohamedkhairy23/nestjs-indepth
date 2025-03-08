import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_NAME } from './user.constants';

class MockUserService {
  findUsers() {
    return ['user1', 'user2'];
  }
}

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
    // {
    //   provide: UsersService,
    //   // Value provider: Inject constant value or for testing purposes
    //   useValue: new MockUserService(),
    // },
    {
      provide: APP_NAME,
      // Value provider: Inject constant value or for testing purposes
      useValue: 'Nest Demo APP',
    },
  ],
})
export class UsersModule {}
