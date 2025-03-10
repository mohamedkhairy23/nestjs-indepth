import { Injectable, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_NAME, LoggerServiceAlias, USER_HABITS } from './user.constants';

class MockUserService {
  findUsers() {
    return ['user1', 'user2'];
  }
}

abstract class ConfigService {}
class DevelopmentConfigService extends ConfigService {}
class ProductionConfigService extends ConfigService {}

class UserHabitsFactory {
  getHabits() {
    return ['eat', 'sleep', 'code'];
  }
}

@Injectable()
class LoggerService {
  // logic here
}

const loggerServiceAliasProvider = {
  provide: LoggerServiceAlias,
  useExisting: LoggerService,
};

@Injectable()
class DatabaseConnection {
  async connectTodB(): Promise<string> {
    return await Promise.resolve('Conneted to db successfully');
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
    // factory based provider (simple factory function (Not depend on other providers))
    {
      provide: USER_HABITS,
      useFactory: () => ['eat', 'sleep', 'code'],
    },
    // factory based provider (complexity factory function (depend on other providers))
    UserHabitsFactory, // that is the new provide that complexity factory depend on It
    {
      provide: USER_HABITS,
      useFactory: async (
        userHabits: UserHabitsFactory,
        dbConnection: DatabaseConnection,
      ) => {
        const dbStatus = await dbConnection.connectTodB();
        console.log(dbStatus);

        return userHabits.getHabits();
      },
      inject: [UserHabitsFactory, DatabaseConnection],
    },
    // Alias Provider
    LoggerService,
    loggerServiceAliasProvider,
  ],
  // export custom provider by its token
  exports: [USER_HABITS],
})
export class UsersModule {}
